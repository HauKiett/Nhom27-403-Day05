import os
from typing import Annotated, List, Union
from typing_extensions import TypedDict
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from langgraph.graph import StateGraph, START, END
from langgraph.graph.message import add_messages
from langgraph.prebuilt import ToolNode, tools_condition

from langchain_openai import ChatOpenAI
from langchain_core.messages import SystemMessage, HumanMessage, AIMessage, BaseMessage
from dotenv import load_dotenv

# Giả lập các tools (Bạn hãy thay bằng tools thực tế của bạn)
def search_flights(origin: str, destination: str, date: str):
    """Tìm kiếm chuyến bay."""
    return f"Flights from {origin} to {destination} on {date}: VN123 (2.5M VND), QH456 (2.1M VND)"

def search_hotels(location: str, check_in: str, check_out: str):
    """Tìm kiếm khách sạn."""
    return f"Hotels in {location}: Vinpearl Resort (3.5M/night), InterContinental (4.2M/night)"

def calculate_budget(flight_cost: float, hotel_cost: float, nights: int, other_expenses: float = 0):
    """Tính toán ngân sách."""
    total = flight_cost + (hotel_cost * nights) + other_expenses
    return f"Total budget: {total} VND"

load_dotenv()

# ===== 1. State =====
class AgentState(TypedDict):
    messages: Annotated[list, add_messages]

# ===== 2. Tools =====
tools_list = [search_flights, search_hotels, calculate_budget]
tool_node = ToolNode(tools_list)

# ===== 3. LLM =====
# Lưu ý: Bạn cần set OPENAI_API_KEY trong file .env
llm = ChatOpenAI(
    model="gpt-4o-mini",
    temperature=0.2
)
llm_with_tools = llm.bind_tools(tools_list)

# ===== 4. Nodes =====
def agent_node(state: AgentState):
    system_prompt = "Bạn là TravelBuddy, trợ lý du lịch của VinFast. Hãy trả lời bằng tiếng Việt."
    messages = [SystemMessage(content=system_prompt)] + state["messages"]
    response = llm_with_tools.invoke(messages)
    return {"messages": [response]}

# ===== 5. Graph =====
workflow = StateGraph(AgentState)
workflow.add_node("agent", agent_node)
workflow.add_node("tools", tool_node)

workflow.add_edge(START, "agent")
workflow.add_conditional_edges("agent", tools_condition)
workflow.add_edge("tools", "agent")

app_graph = workflow.compile()

# ===== 6. FastAPI Setup =====
app = FastAPI()

# Cho phép Frontend gọi API (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Trong thực tế hãy giới hạn URL của web
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str
    history: List[dict] = []

@app.post("/chat")
async def chat(request: ChatRequest):
    try:
        # Chuyển đổi history từ JSON sang LangChain messages
        messages = []
        for m in request.history:
            if m["role"] == "user":
                messages.append(HumanMessage(content=m["content"]))
            elif m["role"] == "assistant":
                messages.append(AIMessage(content=m["content"]))
        
        messages.append(HumanMessage(content=request.message))
        
        # Chạy LangGraph
        result = app_graph.invoke({"messages": messages})
        
        # Lấy tin nhắn cuối cùng của assistant
        final_message = result["messages"][-1].content
        
        return {"response": final_message}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

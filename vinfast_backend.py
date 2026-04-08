import os
import logging
from typing import Annotated, List
from typing_extensions import TypedDict

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from langgraph.graph import StateGraph, START
from langgraph.graph.message import add_messages
from langgraph.prebuilt import ToolNode, tools_condition

from langchain_openai import ChatOpenAI
from langchain_core.messages import SystemMessage, HumanMessage, AIMessage

from tools import search_car_versions, calculate_total_cost, suggest_accessories, analyze_competitor, show_policies
from dotenv import load_dotenv

load_dotenv()

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s — %(levelname)s — %(message)s"
)
logger = logging.getLogger(__name__)

# Load system prompt
with open("system_prompt.txt", "r", encoding="utf-8") as f:
    SYSTEM_PROMPT = f.read()

# ===== State =====
class AgentState(TypedDict):
    messages: Annotated[list, add_messages]

# ===== Tools & LLM =====
tools_list = [search_car_versions, calculate_total_cost, suggest_accessories, analyze_competitor, show_policies]

llm = ChatOpenAI(
    model="gpt-4o-mini",
    openai_api_key=os.getenv("OPENAI_API_KEY"),
    temperature=0.2,
)
llm_with_tools = llm.bind_tools(tools_list)

# ===== Agent Node =====
def agent_node(state: AgentState) -> dict:
    messages = state["messages"]
    response = llm_with_tools.invoke(messages)
    if response.tool_calls:
        for tc in response.tool_calls:
            logger.info(f"Tool call: {tc['name']}({tc['args']})")
    else:
        logger.info("Direct answer (no tool call)")
    return {"messages": [response]}

# ===== Build Graph =====
builder = StateGraph(AgentState)
builder.add_node("agent", agent_node)
builder.add_node("tools", ToolNode(tools_list))
builder.add_edge(START, "agent")
builder.add_conditional_edges("agent", tools_condition)
builder.add_edge("tools", "agent")
graph = builder.compile()

# ===== FastAPI =====
app = FastAPI(title="VinFast AI — Vivi Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
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
        # Reconstruct full message history with system prompt
        messages = [SystemMessage(content=SYSTEM_PROMPT)]
        for m in request.history:
            if m["role"] == "user":
                messages.append(HumanMessage(content=m["content"]))
            elif m["role"] == "assistant":
                messages.append(AIMessage(content=m["content"]))
        messages.append(HumanMessage(content=request.message))

        result = graph.invoke({"messages": messages})
        final_message = result["messages"][-1].content
        return {"response": final_message}

    except Exception as e:
        logger.error(f"Error in /chat: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health():
    return {"status": "ok", "agent": "Vivi — VinFast AI"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

from typing import Annotated
from typing_extensions import TypedDict
from langgraph.graph import StateGraph, START, END
from langgraph.graph.message import add_messages
from langgraph.prebuilt import ToolNode, tools_condition
from langchain_openai import ChatOpenAI
from langchain_core.messages import SystemMessage
from tools import search_car_versions, calculate_total_cost, suggest_accessories, analyze_competitor, show_policies
import logging
from dotenv import load_dotenv
from langgraph.checkpoint.memory import MemorySaver

load_dotenv()
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s — %(levelname)s — %(message)s"
)
logger = logging.getLogger(__name__)

# 1. Đọc System Prompt
with open("system_prompt.txt", "r", encoding="utf-8") as f:
    SYSTEM_PROMPT = f.read()

# 2. Khai báo State
class AgentState(TypedDict):
    messages: Annotated[list, add_messages]

# 3. Khởi tạo LLM và Tools
tools_list = [search_car_versions, calculate_total_cost, suggest_accessories, analyze_competitor, show_policies]
import os
llm = ChatOpenAI(
    model="gpt-4o-mini",
    openai_api_key=os.getenv("OPENAI_API_KEY")
)
llm_with_tools = llm.bind_tools(tools_list)

# 4. Agent Node
def agent_node(state: AgentState) -> dict:
    """Gọi LLM với toàn bộ lịch sử hội thoại, trả về response kèm tool_calls nếu cần."""
    messages = state["messages"]
    response = llm_with_tools.invoke(messages)

    if response.tool_calls:
        for tc in response.tool_calls:
            logger.info(f"Tool call: {tc['name']}({tc['args']})")
    else:
        logger.info("Direct answer")

    return {"messages": [response]}

# 5. Xây dựng Graph
builder = StateGraph(AgentState)
builder.add_node("agent", agent_node)

tool_node = ToolNode(tools_list)
builder.add_node("tools", tool_node)

# Flow chuẩn: START -> agent
builder.add_edge(START, "agent")
# Nếu agent cần tool thì qua tools, không thì END
builder.add_conditional_edges("agent", tools_condition)
# Sau khi tool chạy xong → quay lại agent
builder.add_edge("tools", "agent")

memory = MemorySaver()
graph = builder.compile(checkpointer=memory)

# 6. Chat loop
if __name__ == "__main__":
    print("=" * 60)
    print("Alex — Tư vấn Xe VinFast Thông minh")
    print("      Gõ 'quit' để thoát")
    print("=" * 60)
    
    while True:
        user_input = input("\nNgười dùng: ").strip()
        if user_input.lower() in ["quit", "exit", "q"]:
            break
            
        print("\nAlex đang suy nghĩ...")
        
        try:
            config = {"configurable": {"thread_id": "user-session-1"}}
            result = graph.invoke({
                "messages": [
                    SystemMessage(content=SYSTEM_PROMPT),
                    ("human", user_input)
                ]
            }, config=config)

            final = result["messages"][-1]
            print(f"\nAlex: {final.content}")
        except Exception as e:
            logger.error(f"Lỗi graph.invoke: {e}")
            print("\nAlex: Xin lỗi, có lỗi xảy ra. Vui lòng thử lại.")
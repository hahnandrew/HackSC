import openai
import streamlit as st
import os
from dotenv import load_dotenv
import redis

load_dotenv()

redis_host = os.getenv('REDIS_HOST')
redis_port = os.getenv('REDIS_PORT')
redis_password = os.getenv('REDIS_PASSWORD')

r = redis.Redis(
  host=redis_host,
  port=redis_port,
  password=redis_password)

query_params = st.experimental_get_query_params()
user_token = query_params.get("user_token", [None])[0]

r.set('user_id', user_token)

retrieved_user_id = r.get('user_id')
print(retrieved_user_id.decode('utf-8'))

st.title("Chat")

openai.api_key = st.secrets["OPENAI_API_KEY"]

# st.setComponentValue(3.14)

if "openai_model" not in st.session_state:
    st.session_state["openai_model"] = "gpt-3.5-turbo"

if "messages" not in st.session_state:
    st.session_state.messages = []

for message in st.session_state.messages:
    with st.chat_message(message["role"]):
        st.markdown(message["content"])

if prompt := st.chat_input("What is up?"):
    st.session_state.messages.append({"role": "user", "content": prompt})
    with st.chat_message("user"):
        st.markdown(prompt)

    with st.chat_message("assistant"):
        message_placeholder = st.empty()
        full_response = ""
        for response in openai.ChatCompletion.create(
            model=st.session_state["openai_model"],
            messages=[
                {"role": m["role"], "content": m["content"]}
                for m in st.session_state.messages
            ],
            stream=True,
        ):
            full_response += response.choices[0].delta.get("content", "")
            message_placeholder.markdown(full_response + "▌")
        message_placeholder.markdown(full_response)
    st.session_state.messages.append({"role": "assistant", "content": full_response})
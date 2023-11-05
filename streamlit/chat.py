import openai
import streamlit as st
import os
from dotenv import load_dotenv
import redis

load_dotenv()

# redis_host = os.getenv('REDIS_HOST')
# redis_port = os.getenv('REDIS_PORT')
# redis_password = os.getenv('REDIS_PASSWORD')

# r = redis.Redis(
#   host=redis_host,
#   port=redis_port,
#   password=redis_password)

# query_params = st.experimental_get_query_params()
# user_token = query_params.get("user_token", [None])[0]

# r.set('user_id', user_token)

# retrieved_user_id = r.get('user_id')
# print(retrieved_user_id.decode('utf-8'))
allowed_uids = st.secrets["ALLOWED_UIDS"]

# def is_uid_allowed(uid):
#     # allowed_uids_env = os.getenv('ALLOWED_UIDS', '')
#     allowed_uids = allowed_uids_env.split(',')
#     st.write("Allowed UIDs:", allowed_uids)
#     return uid in allowed_uids


def is_uid_allowed(uid):
    allowed_uids = st.secrets["ALLOWED_UIDS"]
    st.write("Allowed UIDs:", allowed_uids)
    return uid in allowed_uids

SECRET_TOKEN = os.environ.get("SECRET_TOKEN")

user_token = st.experimental_get_query_params().get("user_token", [""])[0]  # Default to an empty string if not found

# st.write("uid in allowed_uids", user_token in allowed_uids)
# st.write("User Token:", user_token)
# st.write("Allowed UIDs:", allowed_uids)


# st.error("Access denied")
# st.stop()
if user_token is not None and is_uid_allowed(user_token):
    st.write("Access granted")
else:
    st.error("Access denied")
    st.stop()


st.title("Chat")

openai.api_key = st.secrets["OPENAI_API_KEY"]


query = '''
Follow as told. Do not output the patient's answer. Act as if you were a doctor and ask “What are your symptoms,” and wait for the patient’s input 1.
Then, summarize input 1 and rephrase it into medical terms and output follow up questions that focus on missing details related to those medical terms, and wait for the patient’s input 2. Based on input 2, output using the following format:

[{"Key symptom 1": "<put details about the extent/severity for this symptom>"},

{"Key symptom 2": "<put details about the extent/severity for this symptom>"},

…

{"Key symptom n": "<put details about the extent/severity for this symptom>"}]
'''



if "openai_model" not in st.session_state:
    st.session_state["openai_model"] = "gpt-4"

if "messages" not in st.session_state:
    st.session_state.messages = [
        {'role': 'user', 'content': query}
    ]

for message in st.session_state.messages[1:]:
    with st.chat_message(message["role"]):
        st.markdown(message["content"])



if prompt := st.chat_input("What are your symtomps?"):
    st.session_state.messages.append({"role": "user", "content": prompt})
    with st.chat_message("user"):
        st.markdown(prompt)
        #st.markdown()

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


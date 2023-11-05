import openai
import streamlit as st

st.title("ChatGPT-like clone")

openai.api_key = st.secrets["OPENAI_API_KEY"]

#openai.api_key = "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"

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


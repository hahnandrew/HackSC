import redis
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
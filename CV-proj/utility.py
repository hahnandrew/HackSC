import sqlite3
import pandas as pd
from sodapy import Socrata
from pw import app_token, username, password, weather_key_api_endpoint
import requests




class preprocessing:

    @staticmethod
    def dict_to_columns_lat_long(dict_):
        return dict_['latitude'], dict_['longitude'] 


def api_request(api_endpoint: str, api_name: str) -> pd.DataFrame:
    '''
    This is the function that makes API requests
    '''
    if api_name.lower().strip() == 'socrata':

        client = Socrata('data.lacity.org',
                 app_token,
                 username=username,
                 password=password)
        
        result = client.get(api_endpoint, limit=50000)
        return pd.DataFrame.from_records(result)
    
    elif api_name.lower().strip() == 'weather':

        url = 'https://api.openweathermap.org/data/2.5/weather'
        params = {'APPID': api_endpoint, 'q': 'Los Angeles', 'units': 'celsius'}
        response = requests.get(url, params=params)
        weather = response.json()
        
        temp = weather['main']['temp'] - 273.15
        condition = weather['weather'][0]['description']

        return pd.DataFrame({'condition': condition, 'temp': temp}, index=[1])




def ingests_parking_meter_live_data_to_parking_meter_occupancy_t(df: pd.DataFrame) -> None:
    '''
    This functions takes a dataframe collected from the parking meter live API endpoint data and stores
    it in the parking_meter_occupancy table in the database
    
    '''
    try:
        conn = sqlite3.connect('traffic.db')
        cursor = conn.cursor()
        for _, row in df.iterrows():
            insert_query = "INSERT INTO parking_meter_occupancy (space_id, eventtime_utc, occupancy_state) VALUES (?, ?, ?);"
            cursor.execute(insert_query, (row['SpaceID'], row['EventTime_UTC'], row['OccupancyState']))
        conn.commit()
    
    except:
        raise Exception("Data didn't make it to database")
    print('Success')

    

def ingests_parking_meter_inventory_to_metered_parking_inventory_t(df: pd.DataFrame):
    '''
    This functions takes a dataframe collected from the parking meter inventory API endpoint data and stores
    it in the metered_parking_inventory table in the database
    
    '''
    try:
        conn = sqlite3.connect('traffic.db')
        cursor = conn.cursor()
        for _, row in df.iterrows():
            insert_query = '''INSERT INTO metered_parking_inventory
                                        (space_id, block_face, meter_type, rate_type, rate_range, metered_time_limit, lat, long) 
                                        VALUES (?, ?, ?, ?, ?, ?, ?, ?);'''
            cursor.execute(insert_query, (row['spaceid'], row['blockface'], row['metertype'], 
                                          row['ratetype'], row['raterange'], row['timelimit'],
                                          preprocessing.dict_to_columns_lat_long(row['latlng'])[0],
                                          preprocessing.dict_to_columns_lat_long(row['latlng'])[1]
                                          ))
        conn.commit()
    
    except:
        raise Exception("Data didn't make it to database")
    print('Success')
    



print(api_request(api_endpoint=weather_key_api_endpoint, api_name='weather'))
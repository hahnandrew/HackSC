import sqlite3

# Create and connect to the SQLite database
conn = sqlite3.connect('traffic.db')
cursor = conn.cursor()


# Define the table schema for parking_meter_occupancy
# This table collects live data from API
create_table_query = """
CREATE TABLE IF NOT EXISTS parking_meter_occupancy  (
    ID INTEGER PRIMARY KEY,
    space_id TEXT,
    eventtime_utc DATETIME,
    occupancy_state TEXT
);
"""

create_metered_parking_inventory_table_query = """
CREATE TABLE IF NOT EXISTS metered_parking_inventory  (
    space_id TEXT PRIMARY KEY,
    block_face TEXT,
    meter_type TEXT,
    rate_type TEXT,
    rate_range TEXT,
    metered_time_limit TEXT,
    lat TEXT,
    long TEXT
);
"""

# Create the table
# cursor.execute(create_metered_parking_inventory_table_query)
# conn.commit()

# Real-Time Sales Analytics

Real-Time Sales Analytics Pipeline using Apache Kafka, Hadoop (HDFS), YARN, and MapReduce, along with a backend API and a live analytics dashboard.

---

We built a real-time analytics system that:

- Streams every user order via Kafka
- Stores raw data safely in HDFS
- Processes large-scale sales data using MapReduce
- Generates insights (top-selling items, revenue, hourly sales)
- Shows analytics live in the frontend dashboard

---

## Architecture Overview

**Pipeline Flow:**

User Orders -> kafka → HDFS → MapReduce → Backend API -> Frontend Dashboard

---

## 🛠️ Components Added to the Original Project

### Apache Kafka (Real-Time Streaming)
- Backend sends each order to **Kafka Producer**
- Kafka stores it in topic: `real_time_orders`
- Reliable → fast → no data loss

### Hadoop HDFS (Storage Layer)
- Kafka Consumer writes incoming order logs to:
- HDFS ensures data is:
  - Distributed
  - Fault tolerant
  - Scalable

### MapReduce (Batch Processing)
- Worker nodes execute MapReduce jobs to compute:
  - Total sales per Item
  - Sales Per Time
  - last 10 Orders

Sample Output:
Producer and consumer logs
Mapr reduce processed data folder

### Backend Analytics API
Exposes endpoints:
/api/sales

### React Frontend Dashboard
Displays:
-  revenue per item 
-  Sales per time  
-  last 10 orders  


## Directory Structure (Big Data Add-On)

canteen-system/
├── kafka-streaming/
│   ├── producer:
           producer.js
│   ├── consumer:
           consumer.js
├── hadoop-jobs/
│   ├── sales-clean/
│      ├── input-sales.csv
│      ├── SalesCleanMapper.java
│      ├── SalesCleanDriver.java
│      ├── SalesCleanReducer.java
├── backend/
|   |--nodebackend:
          auto-run\trigger-mapreduce.js  
│   ├── server.js
├── frontend/
│   ├── dashboard-ui/dashboard/dashboard.jsx


## Summary

- Real-time sales analytics pipeline built using **Kafka + Hadoop + MapReduce** to process canteen orders dynamically.  
- Orders stream → stored in HDFS → processed on worker nodes → analytics displayed in a live dashboard.  
- Provides **scalable, fault-tolerant, real-time insights** for canteen operations.  


# Real-Time Sales Analytics (Big Data Extension)

This project extends the original **Canteen Ordering System** by adding a complete **Real-Time Sales Analytics Pipeline** using **Apache Kafka, Hadoop (HDFS), YARN, and MapReduce**, along with a backend API and a live analytics dashboard.

---

## What This Add-On Does

We built a real-time analytics system that:

- Streams every user order via **Kafka**
- Stores raw data safely in **HDFS**
- Processes large-scale sales data using **MapReduce**
- Generates insights (top-selling items, revenue, hourly sales)
- Shows analytics live in the **frontend dashboard**

---

## Architecture Overview

**Pipeline Flow:**

User Order → Backend → Kafka → HDFS → MapReduce → Analytics Output → Backend API → Frontend Dashboard

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
  - Total sales
  - Item-wise order count
  - Hourly demand
  - Total revenue
  - Most sold items

**Sample Output:**
Burger        120
Cold Coffee    80
Paneer Roll    45
TotalRevenue 18500

### Backend Analytics API
Exposes endpoints:
- `/api/analytics/today`
- `/api/analytics/weekly`
- `/api/analytics/top-items`

### React Frontend Dashboard
Displays:
-  Sales graphs  
-  Top-selling products  
-  Real-time revenue  
-  Peak order hours  


## Real-Time Pipeline Flow


+-------------+       +----------------+       +-------------+
|  Frontend   |  -->  |    Backend     |  -->  |   Kafka     |
+-------------+       +----------------+       +-------------+
                                                         |
                                                         v
                                             +----------------------+
                                             |         HDFS         |
                                             +----------------------+
                                                         |
                                                         v
                                             +----------------------+
                                             |     MapReduce        |
                                             +----------------------+
                                                         |
                                                         v
                                             +----------------------+
                                             |   Analytics Output   |
                                             +----------------------+
                                                         |
                                                         v
                                             +----------------------+
                                             |   Backend API        |
                                             +----------------------+
                                                         |
                                                         v
                                             +----------------------+
                                             |  React Dashboard     |
                                             +----------------------+




## Directory Structure (Big Data Add-On)

canteen-system/
├── kafka/
│   ├── producer.py
│   ├── consumer.py
├── hadoop/
│   ├── mapreduce/
│   │   ├── mapper.py
│   │   ├── reducer.py
│   └── scripts/
│       ├── upload_orders.sh
│       ├── run_mapreduce.sh
├── backend/
│   ├── analytics_controller.js
├── frontend/
│   ├── views/analytics_dashboard.jsx


## Summary

- Real-time sales analytics pipeline built using **Kafka + Hadoop + MapReduce** to process canteen orders dynamically.  
- Orders stream → stored in HDFS → processed on worker nodes → analytics displayed in a live dashboard.  
- Provides **scalable, fault-tolerant, real-time insights** for canteen operations.  

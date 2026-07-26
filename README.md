# Museum Collection Management System

A full-stack application built to manage museum collection data using React, FastAPI, and PostgreSQL.

## Live Application

Frontend:
https://museum-git-main-santhoshs-projects-1fd6dff9.vercel.app/

Backend API:
https://museum-production-fa64.up.railway.app

API Documentation:
https://museum-production-fa64.up.railway.app/docs


## Project Overview

This project is a web application for managing museum collection records through a simple and structured interface.

The application allows users to view, add, update, and delete artist and artwork records. It also supports bulk operations for handling multiple records and provides a dashboard to summarize the collection stored in the database.

The project uses the Museum Collection dataset from Kaggle and focuses on two main entities:

- Artists
- Artworks

Dataset:
https://www.kaggle.com/datasets/momanyc/museum-collection/data?select=artworks.csv


## Tech Stack

### Frontend

- React
- Vite
- Material UI
- Axios

### Backend

- FastAPI
- SQLAlchemy
- Pydantic

### Database

- PostgreSQL
- Docker


## Features

### Museum Collection Management

The application provides an interface to manage museum collection records stored in the database.


### Artist Management

Users can:

- View artist records
- Add new artists
- Edit artist information
- Delete individual artists
- Perform bulk operations


### Artwork Management

Users can:

- View artwork records
- Add new artworks
- Edit artwork information
- Delete individual artworks
- Perform bulk operations


### Dashboard

The dashboard provides a summary of the collection stored in the database.

It displays:

- Total number of artists
- Total number of artworks
- Number of departments
- Number of classifications
- Recently added artists
- Recently added artworks


## Project Structure

```
museum-app/
│
├── backend/
│   ├── app/
│   │   ├── crud/
│   │   ├── models/
│   │   ├── routers/
│   │   ├── schemas/
│   │   ├── database.py
│   │   └── main.py
│   │
│   ├── dataset/
│   ├── seed.py
│   ├── requirements.txt
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── styles/
│   │   └── App.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

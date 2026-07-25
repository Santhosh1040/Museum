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

This project is a web application for managing museum collection records. It allows users to log in and work with artist and artwork data through a simple interface.

The application supports viewing, adding, updating, and deleting records, along with bulk operations for handling multiple records. A dashboard is also included to provide an overview of the collection stored in the database.

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

### Authentication

The application includes a simple username and password-based login system.

After successful authentication, users can access the museum management interface.


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

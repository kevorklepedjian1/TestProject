# React Music Player App

## Overview of Component Structure

The React Music Player App consists of the following key components:

- **SongList**: The main component responsible for rendering the list of songs, handling play functionality, and managing state related to song playback.

- **SongRow**: A component representing a single row in the song list. It displays information about the song and provides a play button to play the corresponding audio.

- **PlayAllButton**: A button component for playing or pausing all songs in the list.

- **AddAllButton**: A button component for adding all songs to a queue.

- **MusicUploadForm**: A form component for uploading new songs with artist information, song name, track ID, and an audio file.

## State Management Approach

The application uses a combination of local state (useState) and context API for managing global state related to the list of songs. The `SongContext` provides a centralized store for the songs data and functions to modify the state.

The `useSongContext` hook allows components to access the global song state and functions to update it.

## How to Run the Application Locally

To run the application locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone <repository-url>

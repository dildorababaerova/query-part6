import React, { useState } from 'react';
import Notification from './Notification';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAnecdote } from '../requests';


const AnecdoteForm = () => {
    const [successNotification, setSuccessNotification] = useState(null); // state for success notification
    const [errorNotification, setErrorNotification] = useState(null); // state for error notification
    const queryClient = useQueryClient();

    const newAnecdoteMutation = useMutation({
        mutationFn: createAnecdote,
        onSuccess: (newAnecdote) => {
          //  refresh the list of anecdotes to get the updated list
          queryClient.invalidateQueries({ queryKey: ['anecdotes'] });
    
          // inform the user that the anecdote was added successfully
          setSuccessNotification(`Anecdote "${newAnecdote.content}" added successfully!`);
          setTimeout(() => {
            setSuccessNotification(null); // hide the notification after 5 seconds
          }, 5000);
        },
        onError: () => {
          // inform the user that the anecdote could not be added
          setErrorNotification('Error: Could not add anecdote. Try again later.');
          setTimeout(() => {
            setErrorNotification(null); // hide the notification after 5 seconds
          }, 5000);
        },
      });


    const onCreate = async (event) => {
      event.preventDefault()
      const content = event.target.anecdote.value
      event.target.anecdote.value = ''
      if (!content || content.length < 5) {
        return;
      }

        newAnecdoteMutation.mutate({ content, votes: 0 });
  }
  
    return (
      <div>
        <h3>create new</h3>
        <form onSubmit={onCreate}>
          <input name='anecdote' />
          <button type="submit">create</button>
        </form>
        <Notification message={successNotification} errorMessage = {false} />
        <Notification message={errorNotification} errorMessage = {true} />
      </div>
    )
  }
  
  export default AnecdoteForm
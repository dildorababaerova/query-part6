import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAnecdotes, updateAnecdote } from './requests';
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';

const App = () => {
  const [successNotification, setSuccessNotification] = useState(null);
  const [errorNotification, setErrorNotification] = useState(null);

  const queryClient = useQueryClient();

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      // Обновляем кэш данных
      const anecdotes = queryClient.getQueryData(['anecdotes']);
      queryClient.setQueryData(
        ['anecdotes'],
        anecdotes.map((a) => (a.id === updatedAnecdote.id ? updatedAnecdote : a))
      );

      // Уведомление об успешном обновлении
      setSuccessNotification(`Anecdote "${updatedAnecdote.content}" updated successfully!`);
      setTimeout(() => setSuccessNotification(null), 5000);
    },
    onError: () => {
      // Уведомление об ошибке
      setErrorNotification('Error: Could not update anecdote. Try again later.');
      setTimeout(() => setErrorNotification(null), 5000);
    },
  });

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false,
  });

  if (result.isLoading) {
    return <div>Loading...</div>;
  }

  if (result.isError) {
    return <div><span>An anecdote service is not available due to server issues.</span></div>;
  }

  const anecdotes = result.data;

  const handleVote = (anecdote) => {
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
    updateAnecdoteMutation.mutate(updatedAnecdote);
  };

  return (
    <div>
      <h3>Anecdote app</h3>
      <AnecdoteForm />
      <Notification message={successNotification} errorMessage={false} />
      <Notification message={errorNotification} errorMessage={true} />
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;

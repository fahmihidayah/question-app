// hooks/usePusher.ts
import { useEffect, useState } from 'react';
import { pusherClient } from './pusher-client';

export const usePusher = (channelName: string, eventName: string, currentSlug: string, onRefresh : () => void) => {

    const [isConnected, setIsConnected] = useState<boolean>(false);

    

    useEffect(() => {
        // Subscribe to channel
        const channel = pusherClient.subscribe(channelName);

        // Connection state handlers
        pusherClient.connection.bind('connected', () => {
            setIsConnected(true);
            console.log('Connected to Pusher');
        });

        pusherClient.connection.bind('disconnected', () => {
            setIsConnected(false);
            console.log('Disconnected from Pusher');
        });

        // Event handler
        channel.bind(eventName, (slug: string) => {
            console.log('Received message:', slug);
            if(currentSlug === slug) {
                onRefresh()
            }

        });

        // Cleanup function
        return () => {
            channel.unbind(eventName);
            pusherClient.unsubscribe(channelName);
        };
    }, [channelName, eventName]);

    return { isConnected };
};

// Alternative hook for sending messages
// export const usePusherSender = () => {
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   const sendMessage = async (questionData: Omit<Question, 'id' | 'created_at'>) => {
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch('/api/questions', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(questionData),
//       });

//       const result = await response.json();

//       if (!response.ok) {
//         throw new Error(result.message || 'Failed to send message');
//       }

//       return result;
//     } catch (err) {
//       const errorMessage = err instanceof Error ? err.message : 'Unknown error';
//       setError(errorMessage);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { sendMessage, loading, error };
// };
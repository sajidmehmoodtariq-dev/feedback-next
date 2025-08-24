'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import AIMessageAssistant from '@/components/AIMessageAssistant';

export default function SendMessage() {
    const params = useParams();
    const username = params.username as string;
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [feedback, setFeedback] = useState('');
    const [messageLength, setMessageLength] = useState(0);

    const MAX_LENGTH = 300;

    const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        if (value.length <= MAX_LENGTH) {
            setMessage(value);
            setMessageLength(value.length);
        }
    };

    const handleAIMessageUpdate = (newMessage: string) => {
        if (newMessage.length <= MAX_LENGTH) {
            setMessage(newMessage);
            setMessageLength(newMessage.length);
        } else {
            // Truncate if too long
            const truncated = newMessage.substring(0, MAX_LENGTH);
            setMessage(truncated);
            setMessageLength(MAX_LENGTH);
            setFeedback('Message was truncated to fit the character limit');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!message.trim()) {
            setFeedback('Please enter a message');
            return;
        }

        if (message.trim().length < 10) {
            setFeedback('Message must be at least 10 characters long');
            return;
        }

        setIsLoading(true);
        setFeedback('');

        try {
            const response = await fetch('/api/send-message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    content: message.trim()
                }),
            });

            const data = await response.json();

            if (data.success) {
                setFeedback('Message sent successfully!');
                setMessage('');
                setMessageLength(0);
            } else {
                setFeedback(data.message || 'Failed to send message');
            }
        } catch (error) {
            console.error('Send message error:', error);
            setFeedback('An error occurred while sending the message');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="card p-8 w-full max-w-2xl hover-lift animate-fade-in">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-foreground mb-2">
                        Send Anonymous Message
                    </h1>
                    <p className="text-muted-foreground">
                        Send a message to <span className="font-medium text-primary">@{username}</span>
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                            Your Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            rows={6}
                            value={message}
                            onChange={handleMessageChange}
                            className="w-full"
                            placeholder="Type your anonymous message here..."
                        />
                        <div className="flex justify-between items-center mt-2">
                            <p className="text-xs text-muted-foreground">
                                Minimum 10 characters required
                            </p>
                            <p className={`text-xs ${
                                messageLength > MAX_LENGTH * 0.9 ? 'text-destructive' : 'text-muted-foreground'
                            }`}>
                                {messageLength}/{MAX_LENGTH}
                            </p>
                        </div>

                        {/* AI Assistant */}
                        <AIMessageAssistant
                            message={message}
                            onMessageUpdate={handleAIMessageUpdate}
                            disabled={isLoading}
                        />
                    </div>

                    {feedback && (
                        <div className={`p-4 rounded-xl text-sm animate-fade-in ${
                            feedback.includes('successfully')
                                ? 'bg-success/10 text-success border border-success/20'
                                : 'bg-destructive/10 text-destructive border border-destructive/20'
                        }`}>
                            {feedback}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading || message.trim().length < 10}
                        className="btn-primary w-full py-3 px-4 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                    >
                        {isLoading ? 'Sending...' : 'Send Anonymous Message'}
                    </button>
                </form>

                <div className="mt-8 p-4 rounded-lg bg-muted">
                    <h3 className="text-sm font-medium text-foreground mb-2">Privacy & AI Notice</h3>
                    <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• Your message will be sent anonymously</li>
                        <li>• We do not store any identifying information about you</li>
                        <li>• AI assistance is optional and helps improve message clarity</li>
                        <li>• Please be respectful and constructive in your feedback</li>
                        <li>• Harmful or inappropriate messages may be reported</li>
                    </ul>
                </div>

                <div className="mt-6 text-center">
                    <Link href="/" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                        ← Back to home
                    </Link>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-muted-foreground text-sm">
                        Want to receive anonymous messages too?{' '}
                        <Link href="/sign-up" className="text-primary hover:text-primary/80 font-medium transition-colors">
                            Create your account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

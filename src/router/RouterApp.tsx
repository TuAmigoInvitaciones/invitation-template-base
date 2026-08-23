import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { Envelop, Invitation, Search, Ticket } from '@/modules'
import { useInvitationConfig, useTicket } from '@/common/hooks'

export const RouterApp: React.FC = () => {
    const { config } = useInvitationConfig()
    const { ticket, onCheckInitialData } = useTicket()

    useEffect(() => {
        onCheckInitialData()
    }, [onCheckInitialData])

    const hasTicketingSystem = config.hasTicketingSystem

    return (
        <BrowserRouter>
            <Routes>
                {!hasTicketingSystem ? (
                    <>
                        <Route path="/" element={<Invitation />} />
                        <Route path="/envelop" element={<Envelop />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </>
                ) : (
                    <>
                        <Route path="/search" element={<Search />} />

                        {ticket ? (
                            <>
                                <Route path="/" element={<Invitation />} />
                                <Route path="/ticket" element={<Ticket />} />
                                <Route path="/envelop" element={<Envelop />} />
                                <Route path="*" element={<Navigate to="/" replace />} />
                            </>
                        ) : (
                            <Route path="*" element={<Navigate to="/search" replace />} />
                        )}
                    </>
                )}
            </Routes>
        </BrowserRouter>
    )
}

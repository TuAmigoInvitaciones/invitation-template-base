import { useCallback, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"

import type { AppDispatch, RootState } from "@/store/store"
import { setIsChecking, setTicket } from "@/store/ticket/ticket.slice"
import { startGettingTicket } from "@/store/ticket/ticket.thunk"
import { closeMenu } from "@/store/ui/menu.slice"
import { closeModal } from "@/store/ui/modal.slice"

const TICKET_STORAGE_KEY = 'abrasa-ticket'

export const useTicket = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { error, isLoading, isChecking, ticket } = useSelector((state: RootState) => state.ticket)
    const initialTicketRef = useRef(ticket)

    const getStoredTicket = useCallback(() => {
        const rawTicket = localStorage.getItem(TICKET_STORAGE_KEY)
        if (!rawTicket) return null

        try {
            return JSON.parse(rawTicket)
        } catch {
            return null
        }
    }, [])

    const onGetTicket = (keyPass: string) => dispatch(startGettingTicket(keyPass))

    const onRemoveTicket = () => {
        localStorage.removeItem(TICKET_STORAGE_KEY)
        dispatch(setTicket(null))
        dispatch(closeMenu())
        dispatch(closeModal())
    }

    const onCheckInitialData = useCallback(() => {

        const storedTicket = getStoredTicket()
        if (storedTicket) {
            dispatch(setTicket(storedTicket))
            dispatch(setIsChecking(false))
            return
        }

        const reduxTicket = initialTicketRef.current
        const hasValidReduxTicket = Boolean(
            reduxTicket && (reduxTicket.id || reduxTicket.keyPass || reduxTicket.name)
        )

        if (hasValidReduxTicket && reduxTicket) {
            localStorage.setItem(TICKET_STORAGE_KEY, JSON.stringify(reduxTicket))
            dispatch(setTicket(reduxTicket))
        } else {
            dispatch(setTicket(null))
        }

        dispatch(setIsChecking(false))
    }, [dispatch, getStoredTicket])

    return {
        ticket,
        isLoading,
        isChecking,
        error,

        onGetTicket,
        onRemoveTicket,
        onCheckInitialData,
        getStoredTicket,
    }
}
import { useDispatch, useSelector } from "react-redux"
import { useCallback } from "react";

import type { AppDispatch, RootState } from "@/store/store";
import { setTicket } from "@/store/ticket/ticket.slice";
import { closeMenu } from "@/store/ui/menu.slice";
import { closeModal } from "@/store/ui/modal.slice";
import { startGettingTicket } from "@/store/ticket/ticket.thunk";

export const useTicket = () => {

    const dispatch = useDispatch<AppDispatch>();
    const { error, isLoading, ticket } = useSelector((state: RootState) => state.ticket)

    const onGetTicket = useCallback(async (keyPass: string) => {
        return await dispatch(startGettingTicket(keyPass))
    }, [dispatch])

    const onRemoveTicket = useCallback(() => {
        localStorage.removeItem('abrasa-ticket')
        dispatch(setTicket(null))
        dispatch(closeMenu())
        dispatch(closeModal())
    }, [dispatch])

    const onCheckInitialData = useCallback(() => {
        const ticket = localStorage.getItem('abrasa-ticket')
        if (ticket) {
            dispatch(setTicket(JSON.parse(ticket)))
        }
    }, [dispatch])

    return {
        error,
        isLoading,
        ticket,

        onGetTicket,
        onRemoveTicket,
        onCheckInitialData
    }

}
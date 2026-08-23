import { useDispatch, useSelector } from "react-redux"
import { isAxiosError } from "axios";
import { toast } from "sonner";

import type { RootState } from "@/store/store";
import { setIsLoading, setTicket } from "@/store/ticket/ticket.slice";

import type { Ticket } from "@/common/types/ticket.types";
import { instance } from "@/common/config/http.plugin";
import { useCallback } from "react";
import { closeMenu } from "@/store/ui/menu.slice";
import { closeModal } from "@/store/ui/modal.slice";

export const useTicket = () => {

    const dispatch = useDispatch();
    const { error, isLoading, ticket } = useSelector((state: RootState) => state.ticket)

    const onGetTicket = useCallback(async (keyPass: string) => {
        try {
            dispatch(setIsLoading(true))

            const { data: ticket } = await instance.get<Ticket>(`tickets/keyPass/${keyPass}`)

            dispatch(setTicket(ticket))
            localStorage.setItem('abrasa-ticket', JSON.stringify(ticket))
            toast.success(`Bienvenido ${ticket.name}`)
        } catch (error: unknown) {
            if (isAxiosError(error)) {
                if (error.response?.status === 404) {
                    toast.error('Boleto no encontrado. Verifica tu clave de acceso.')
                } else {
                    toast.error(error.response?.data?.errors?.[0] ?? 'Ocurrió un error. Intenta de nuevo.')
                }
            }
        } finally {
            dispatch(setIsLoading(false))
        }
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
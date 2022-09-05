import { RootState } from "../store";
import { useDispatch, useSelector } from 'react-redux';
import { setDashboardTitle } from "../ducks/ui.duck";

export function useUiState() {
    const dispatch = useDispatch()
    const dashboardTitle = useSelector((state: RootState) => state.ui.dashboardTitle)
    return {
        dashboardTitle,
        setDashboardTitle: (payload: string) => dispatch(setDashboardTitle(payload))
    }
}
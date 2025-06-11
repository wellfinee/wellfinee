import { Outlet } from "react-router";
import Header from "../../UI/Header/Header";
function MainPagesLayout() {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}
export default MainPagesLayout
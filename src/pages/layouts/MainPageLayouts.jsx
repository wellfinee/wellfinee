import { Outlet } from "react-router";
import Header from "../../UI/header";
function MainPagesLayout() {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}
export default MainPagesLayout
import ComponenetHeader from "./ComponenetHeader"
import AllTasksAndCategory from "./AllTasksAndCategory"
export default function CardComponent() {
    return(
        <div style={{width: "100%", margin: "0 15px" }}>
            <ComponenetHeader />
            <AllTasksAndCategory />
        </div>
    )
}
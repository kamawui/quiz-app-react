import "./skeleton.css";

function Skeleton() {
    return (
        <div className="skeleton-wrapper">
            <div className="skeleton-info">Please select a quiz to see options</div>
            <div className="skeleton">
                <div className="pulse skeleton-header">
                    <div className="pulse skeleton-circle"></div>
                    <div className="pulse skeleton-mini"></div>
                </div>
                <div className="pulse skeleton-block"></div>
                <div className="pulse skeleton-block"></div>
                <div className="pulse skeleton-block"></div>
            </div>
        </div>
    )
}

export default Skeleton;
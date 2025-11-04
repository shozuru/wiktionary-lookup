import React from 'react'

interface PageInfo {
    currentPage: number
    setCurrentPage: (page: number) => void
    hasNextPage: boolean
}

const PageControls: React.FC<PageInfo> =
    ({ currentPage, setCurrentPage, hasNextPage }) => {

        return (
            <div
                className="page-controls"
            >
                <button
                    className="go-back-button"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage == 1}
                >
                    Previous
                </button>

                <span
                    className="current-page"
                >
                    Page {currentPage}
                </span>

                <button
                    className="go-forward-button"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={!hasNextPage}
                >
                    Next
                </button>
            </div>
        )
    }

export default PageControls
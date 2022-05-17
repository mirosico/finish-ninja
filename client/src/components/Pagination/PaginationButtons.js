import Pagination from 'react-bootstrap/Pagination'
import {useSelector, useDispatch} from 'react-redux';
import {setPage} from "../../actions/heroes";


const PaginationButtons = () => {
    const dispatch = useDispatch();
    const numberOfPages = useSelector(state => state.numberOfPages)
    const page = useSelector(state => state.page)

    const buttons = [];
    for (let i = 0; i < numberOfPages; i++) {
        buttons.push(i + 1);
    }

    return (
        <Pagination size="lg">
            {!numberOfPages && <Pagination.Item active>0</Pagination.Item>}

            {page > 2 && <Pagination.First onClick={() => dispatch(setPage(1))}/>}

            {buttons.map((x, i) =>
                x === page ? (
                    <Pagination.Item active key={i}>
                        {x}
                    </Pagination.Item>
                ) : (
                    ((x < page && x > page - 3) || (x > page && x < page + 3)) && (
                        <Pagination.Item key={i} onClick={() => dispatch(setPage(x))}>
                            {x}
                        </Pagination.Item>
                    )
                )
            )}
            {page < numberOfPages - 1 && (
                <Pagination.Last
                    onClick={() => {
                        dispatch(setPage(numberOfPages));
                    }}
                />
            )}
        </Pagination>
    );
};

export default PaginationButtons;

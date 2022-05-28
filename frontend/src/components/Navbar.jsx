//External dependencies import
import styled from 'styled-components';
import { Link } from 'react-router-dom';

//Styled Navbar (This is only done to fulfill the requirement of the assignment)
const Navbar = styled.nav`
    background-color: white;
    border-bottom: 1px solid rgb(203 213 225);
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 3.5rem;
    width: 100%;
`;

export default () => {
    return (
        <Navbar>
            <Link to="/">
                <h1 className="ml-4 text-2xl font-semibold">Romland.Dev</h1>
            </Link>
            <Link to="/search" className="mr-4 text-2xl md:text-xl">
                Search
            </Link>
        </Navbar>
    );
};

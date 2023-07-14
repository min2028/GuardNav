import styled, { css, keyframes } from 'styled-components';
import React from 'react';
import { HistoryCard } from '../index';

import { useDispatch } from 'react-redux';
import { setFavourite } from '../../reducers/HistoryReducer';

const HistoryListContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    font-family: 'Josefin Sans', sans-serif;
    z-index: 5;
    overflow-y: hidden;
    overflow-x: hidden;
    
    ${props => props.expanded && css`
        overflow-y: auto;
    `}
`;

const DefaultView = styled.div`
`;

const disappear = keyframes`
  0% {
    visibility: visible;
    opacity: 1;
  }
  99% {
    visibility: visible;
    opacity: 0;
  }
  100% {
    visibility: hidden;
    display: none;
    width: 0;
  }
`;

const appear = keyframes`
  0% {
    visibility: hidden;
    opacity: 0;
  }
  1% {
    visibility: visible;
    display: block;
  }
  100% {
    visibility: visible;
    opacity: 1;
  }
`;

const ExpandedView = styled.div`
    transition: all 0.2s ease-in-out;
    z-index: 5;
    margin: 0;
    visibility: hidden;
    transform: translateY(-0.5%);
    opacity: 0;
    position: relative;

    ${props => props.open ? css`
        animation: ${appear} 0.2s ease-in-out forwards;
        pointer-events: auto;
    ` : css`
        animation: ${disappear} 0.2s ease-in-out forwards;
    `}
`;

const sortByFavourite = (history) => {
    const favourite = history.filter((trip) => trip.favourite);
    const notFavourite = history.filter((trip) => !trip.favourite);
    return [...favourite, ...notFavourite];
};


const HistoryList = ({ history, onClick, expanded }) => {
    const dispatch = useDispatch();

    const sortedHistory = sortByFavourite(history.items);

    return (
        <HistoryListContainer expanded={expanded} className={"history-list"}>
            <DefaultView>
                { sortedHistory.slice(0, 3).map((trip, index) => (
                        <HistoryCard
                            key={index}
                            risk={trip.risk}
                            time={trip.time}
                            from={trip.from}
                            to={trip.to}
                            favourite={trip.favourite}
                            onClick={() => onClick(trip.from, trip.to)}
                            onFavouriteClick={() => dispatch(setFavourite(trip.id))}
                        />
                    ))
                }
            </DefaultView>
            <ExpandedView open={expanded}>
                { sortedHistory.slice(3).map((trip, index) => (
                        <HistoryCard
                            key={index}
                            risk={trip.risk}
                            time={trip.time}
                            from={trip.from}
                            to={trip.to}
                            favourite={trip.favourite}
                            onClick={() => onClick(trip.from, trip.to)}
                            onFavouriteClick={() => dispatch(setFavourite(trip.id))}
                        />
                    ))
                }
            </ExpandedView>
        </HistoryListContainer>
    )
}

export default HistoryList;


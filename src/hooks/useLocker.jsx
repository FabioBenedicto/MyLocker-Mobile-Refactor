import { useContext } from 'react';
import { LockerContext } from '../contexts/LockerContext';

export default function useLocker() {
    return useContext(LockerContext);
}

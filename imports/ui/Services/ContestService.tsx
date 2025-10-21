import {create} from "zustand";
import {MethodSetContestCreateRequestModel} from "/imports/api/Сontest/models";

interface IContestService {
    setContests(data: MethodSetContestCreateRequestModel): Promise<void>;
}

export const ContestService = create<IContestService>(() => {
    return {
        setContests(data) {
            return new Promise((resolve, reject) => {
                console.log("ContestService");
                console.log(data)
            })
        }
    }
})
import { autorun, makeAutoObservable, toJS } from "mobx";
import type { Score } from "../types";
import {
    getLeaderboard,
    rankScores,
    saveLeaderboard,
} from "../utils/leaderboard";

class LeaderboardStore {
    scores: Score[] = getLeaderboard();

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }
    addScore(score: Score) {
        this.scores = rankScores([...this.scores, score]);
    }
    clearScores() {
        this.scores = [];
    }
}

export const leaderboardStore = new LeaderboardStore();

autorun(() => saveLeaderboard(toJS(leaderboardStore.scores)));
(window as any).leaderboardStore = leaderboardStore;

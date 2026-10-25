import { autorun, makeAutoObservable, toJS } from "mobx";
import type { TextSet } from "../types";
import {
    createTextSet,
    getTextSets,
    normalizeText,
    saveTextSets,
} from "../utils/textSets";
class SetsStore {
    sets: TextSet[] = getTextSets();

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }
    addText(setId: string, text: string) {
        const clean = normalizeText(text);
        if (!clean) return;

        const set = this.sets.find((item) => item.id === setId);
        if (!set) return;
        set.texts.push(clean);
    }
    addTexts(setId: string, texts: string[]) {
        const clean = texts.map(normalizeText).filter(Boolean);
        if (clean.length === 0) return;

        const set = this.sets.find((item) => item.id === setId);
        if (!set) return;
        set.texts.push(...clean);
    }
    addSet(title: string) {
        const clean = normalizeText(title);
        if (!clean) return null;

        const newSet = createTextSet(clean);
        this.sets.push(newSet);
        return newSet.id;
    }
    renameSet(setId: string, title: string) {
        const clean = normalizeText(title);
        if (!clean) return;

        const set = this.sets.find((item) => item.id === setId);
        if (!set) return;
        set.title = clean;
    }

    removeText(setId: string, textIndex: number) {
        const set = this.sets.find((item) => item.id === setId);
        if (!set) return;
        set.texts.splice(textIndex, 1);
    }
    removeSet(setId: string) {
        if (this.sets.length <= 1) return;
        this.sets = this.sets.filter((set) => set.id !== setId);
    }
}

export const setsStore = new SetsStore();

autorun(() => saveTextSets(toJS(setsStore.sets)));


import type { ParamMatcher } from "@sveltejs/kit";


const match: ParamMatcher = (param: string): boolean => {
    return /^\d+$/.test(param);

}

export { match };

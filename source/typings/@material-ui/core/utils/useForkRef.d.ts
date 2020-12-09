import { Ref, RefCallback } from "react";

export = useForkRef;

declare function useForkRef<RefType>(refA: Ref<RefType>, refB: Ref<RefType>): RefCallback<RefType>;

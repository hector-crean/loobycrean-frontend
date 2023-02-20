<script lang="ts">
    import type {
        Annotation,
        AnnotationConnector,
        AnnotationNote,
        AnnotationSubject,
    } from "./annotation.type";

    type $$Props = {
        annotation: Annotation;
    };

    interface $$Slots {
        // we don't want to render a default slot
        default: never;
        // the named slot exposes no variables (use an empty object)
        "annotation-note": { note: AnnotationNote };
        // we have to use the `$$Slots` interface if we have two slots with the same name exposing differently typed props
        "annotation-subject": { subject: AnnotationSubject };
        "annotation-connector": { connector: AnnotationConnector };
    }

    export let annotation: Annotation;

    // const matchSubject = (s: AnnotationSubject): SvelteComponent => {
    //     switch (s.kind) {
    //         case "badge":
    //             return Badge;
    //         case "callout-circle":
    //             return CalloutCircle;
    //         case "callout-rect":
    //             return CalloutRect;
    //         case "no-subject":
    //             return NoSubject;
    //     }
    // };
</script>

<!-- <svelte:component this={matchSubject(subject)} /> -->
<slot name="annotation-note" note={annotation.note} />
<slot name="annotation-subject" subject={annotation.subject} />
<slot name="annotation-connector" connector={annotation.connector} />

<style lang="scss">
</style>

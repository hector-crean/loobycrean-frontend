<script lang="ts">
    import AnnotationComponent from "./Annotation.svelte";
    import type { Annotation } from "./annotation.type";
    import Line from "./connector/Line.svelte";
    import Path from "./connector/Path.svelte";
    import Polyline from "./connector/Polyline.svelte";
    import Note from "./Note.svelte";
    import { Badge } from "./subject";
    import Circle from "./subject/Circle.subject.svelte";
    import PartitionLine from "./subject/PartitionLine.subject.svelte";
    import Rect from "./subject/Rect.subject.svelte";

    type $$Props = {
        dataCtxKey: symbol;
        annotations: Array<Annotation>;
    };

    export let dataCtxKey: symbol;
    export let annotations: Array<Annotation>;
</script>

<!-- <svelte:component this={matchSubject(subject)} /> -->

{#each annotations as annotation}
    <AnnotationComponent {annotation}>
        <svelte:fragment slot="annotation-note" let:note>
            <Note {note} {dataCtxKey} />
            >
        </svelte:fragment>
        <svelte:fragment slot="annotation-subject" let:subject>
            {#if subject.kind === "badge"}
                <Badge {...subject.props} />
            {:else if subject.kind === "circle"}
                <Circle {dataCtxKey} {...subject.props} />
            {:else if subject.kind === "rectangle"}
                <Rect {...subject.props} />
            {:else if subject.kind === "partition-line"}
                <PartitionLine {...subject.props} />
            {/if}
        </svelte:fragment>
        <svelte:fragment slot="annotation-connector" let:connector>
            {#if connector.kind === "line"}
                <Line {dataCtxKey} {...connector.props} />
            {:else if connector.kind === "polyline"}
                <Polyline {...connector.props} />
            {:else if connector.kind === "path"}
                <Path {dataCtxKey} {...connector.props} />
            {/if}
        </svelte:fragment>
    </AnnotationComponent>
{/each}

<style lang="scss">
</style>

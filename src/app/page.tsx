"use client";
import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  toolbarPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  CodeToggle,
  BlockTypeSelect,
  CreateLink,
  linkDialogPlugin,
  diffSourcePlugin,
  InsertFrontmatter,
  frontmatterPlugin,
  imagePlugin,
  InsertImage,
  tablePlugin,
  InsertTable,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";

export default function App() {
  return (
    <div className={"prose"}>
      <MDXEditor
        markdown={"# Hello World"}
        plugins={[
          headingsPlugin(),
          listsPlugin(),
          quotePlugin(),
          thematicBreakPlugin(),
          markdownShortcutPlugin(),
          linkDialogPlugin(),
          diffSourcePlugin(),
          frontmatterPlugin(),
          imagePlugin(),
          tablePlugin(),
          toolbarPlugin({
            toolbarContents: () => (
              <>
                {" "}
                <UndoRedo />
                <BoldItalicUnderlineToggles />
                <BlockTypeSelect />
                <CodeToggle />
                <CreateLink />
                <InsertFrontmatter />
                <InsertImage />
                <InsertTable />
              </>
            ),
          }),
        ]}
      />
    </div>
  );
}

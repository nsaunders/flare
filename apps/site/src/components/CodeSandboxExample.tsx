import Button from "./Button";
import CodeSandboxIcon from "./CodeSandboxIcon";
import GitHubIcon from "./GitHubIcon";

export default function CodeSandboxExample({ id }: { id: string }) {
  return (
    <div style={{ display: "inline-flex", gap: 16 }}>
      <Button
        as="a"
        href={`https://github.com/nsaunders/flare/tree/master/examples/${id}`}
        motif="basic"
        size="large"
        icon={GitHubIcon}
      >
        Source
      </Button>
      <Button
        as="a"
        href={`https://codesandbox.io/s/github/nsaunders/flare/tree/master/examples/${id}?file=/src/main.tsx`}
        motif="basic"
        size="large"
        icon={CodeSandboxIcon}
      >
        Live Demo
      </Button>
    </div>
  );
}

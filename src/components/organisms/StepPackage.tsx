import {
  ChangeEventHandler,
  FunctionComponent,
  MouseEventHandler,
  useRef,
} from "react";
import styled from "styled-components";

import dummy from "@/assets/dummy-package.json";
import Button from "@/components/atoms/Button";
import Text from "@/components/atoms/Text";
import TextArea from "@/components/atoms/TextArea";
import StepSection from "@/components/molecules/StepSection";
import styles from "@/styles/Home.module.css";

type StepPackageProps = {
  className?: string;
  onChange: (data: string) => void;
};
const StepPackage: FunctionComponent<StepPackageProps> = ({
  className,
  onChange,
}) => {
  const $input = useRef<HTMLTextAreaElement>(null);

  const handleInputChange: ChangeEventHandler<HTMLTextAreaElement> = (
    event
  ) => {
    onChange(event.target.value);
  };
  const handleDummyFill: MouseEventHandler<HTMLButtonElement> = () => {
    if (!$input.current) {
      return;
    }
    const json = JSON.stringify(dummy, null, 2);
    $input.current.value = json;
    onChange(json);
  };

  return (
    <StepSection
      className={className}
      title={
        <>
          1. Providing <code>package.json</code>
        </>
      }
    >
      <InputWrap>
        <TextArea
          forwardRef={$input}
          onChange={handleInputChange}
          placeholder={`{"todo":"Put your package.json here"}`}
          rows={16}
        />
        <DummyButtonWrap>
          <Button
            size="small"
            variant="secondary"
            className={styles.jsonDummyButton}
            onClick={handleDummyFill}
          >
            Use demo <code>package.json</code>
          </Button>
        </DummyButtonWrap>
      </InputWrap>
      <p>
        <Text size="small">
          The website extracts <code className={styles.code}>dependencies</code>{" "}
          and <code className={styles.code}>devDependencies</code> from any
          valid json object while removing semver incompatible version locks
          (thus removing https/ssh/path packages).{" "}
          <strong>
            Don&#8217;t worry, we don&#8217;t store your{" "}
            <code className={styles.code}>package.json</code> and only query
            package manifests from the remote registry.
          </strong>
        </Text>
      </p>
    </StepSection>
  );
};

const InputWrap = styled.div`
  width: 100%;
  position: relative;
`;
const DummyButtonWrap = styled.div`
  position: absolute;
  right: 0.75rem;
  bottom: 0.5rem;
  white-space: nowrap;
`;

export default StepPackage;

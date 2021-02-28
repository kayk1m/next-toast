import React from 'react';
import styled from 'styled-components';
import isDecimal from 'validator/lib/isDecimal';

// importing material-ui components
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

// importing components
import { Head, Layout } from '@components/core';
import { useUI } from '@components/ui/context';

// importing libraries

const Root = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem 1rem;

  section {
    margin: 1rem 0;
  }

  .label {
    margin-bottom: 0.5rem;
  }
`;

type ToastConfig = {
  type: 'default' | 'warning';
  expiresIn: number;
  content: string;
};

const Home = () => {
  const { addToast } = useUI();
  const [toastConfig, setToastConfig] = React.useState<ToastConfig>({
    type: 'default',
    expiresIn: 5,
    content: '',
  });

  const handleAddToast = React.useCallback(
    (config: ToastConfig) => {
      addToast(config);
    },
    [addToast],
  );

  return (
    <>
      <Head>
        <title>Toast Example</title>
      </Head>
      <Root>
        <section>
          <p className="label">Type</p>
          <Select
            value={toastConfig.type}
            onChange={(e) =>
              setToastConfig({ ...toastConfig, type: e.target.value as never })
            }
          >
            <MenuItem value="default">default</MenuItem>
            <MenuItem value="warning">warning</MenuItem>
          </Select>
        </section>
        <section>
          <p className="label">Expires Time (s)</p>
          <TextField
            type="number"
            variant="outlined"
            size="small"
            value={String(toastConfig.expiresIn)}
            onChange={(e) => {
              if (isDecimal(e.target.value)) {
                setToastConfig({
                  ...toastConfig,
                  expiresIn: Number(e.target.value),
                });
              }
            }}
          />
        </section>
        <section>
          <p className="label">Content</p>
          <TextField
            autoComplete="off"
            fullWidth
            multiline
            variant="outlined"
            size="small"
            value={toastConfig.content}
            onChange={(e) =>
              setToastConfig({
                ...toastConfig,
                content: e.target.value,
              })
            }
          />
        </section>
        <div>
          <Button
            variant="contained"
            className="float-right"
            color="primary"
            onClick={() => handleAddToast(toastConfig)}
          >
            add toast
          </Button>
        </div>
      </Root>
    </>
  );
};

Home.Layout = Layout;

export default Home;

/* eslint-disable react/no-array-index-key */
import { Cancel } from '@mui/icons-material';
import {
  Box,
  Stack,
  TextField,
  TextFieldProps,
  Typography,
} from '@mui/material';
import { useCallback, useRef, useState } from 'react';

type TagsArgs = {
  data: string;
  handleDelete: (data: string) => void;
};

type InputTagsArgs = {
  tags: string[];
  onTagsChanged?: (tags: string[]) => void;
};

const Tags = ({ data, handleDelete }: TagsArgs) => {
  return (
    <Box
      sx={{
        background: '#283240',
        height: '100%',
        display: 'flex',
        padding: '0.4rem',
        margin: '0 0.5rem 0 0',
        justifyContent: 'center',
        alignContent: 'center',
        color: '#ffffff',
      }}
    >
      <Stack direction="row" gap={1}>
        <Typography>{data}</Typography>
        <Cancel
          sx={{ cursor: 'pointer' }}
          onClick={() => {
            handleDelete(data);
          }}
        />
      </Stack>
    </Box>
  );
};

const InputTags: React.FC<InputTagsArgs> = args => {
  const { onTagsChanged, tags } = args;

  // const [tags, setTags] = useState<string[]>(() => args.tags ?? []);
  const tagRef = useRef<TextFieldProps>();

  const handleDelete = (value: string) => {
    const newtags = tags.filter(val => val !== value);
    // setTags(newtags);
    if (onTagsChanged) onTagsChanged(newtags);
  };

  const handleAdd = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (tagRef.current) {
          const tagsWithNewItem = [...tags, String(tagRef.current?.value)];
          // setTags(tagsWithNewItem);
          if (onTagsChanged) onTagsChanged(tagsWithNewItem);

          tagRef.current.value = '';
        }
      }
    },
    [onTagsChanged],
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <TextField
        inputRef={tagRef}
        onKeyDown={handleAdd}
        fullWidth
        variant="standard"
        size="small"
        sx={{ margin: '1rem 0' }}
        margin="none"
        placeholder={tags.length < 5 ? 'Enter tags' : ''}
        InputProps={{
          startAdornment: (
            <Box sx={{ margin: '0 0.2rem 0 0', display: 'flex' }}>
              {tags.map((data, index) => {
                return (
                  <Tags data={data} handleDelete={handleDelete} key={index} />
                );
              })}
            </Box>
          ),
        }}
      />
    </Box>
  );
};

export default InputTags;

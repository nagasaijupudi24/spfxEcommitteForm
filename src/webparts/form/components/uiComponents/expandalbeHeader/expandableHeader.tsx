import React, { useState } from 'react';
import { IconButton, Stack, Text, IStackTokens, DetailsList, DetailsListLayoutMode, IColumn, IDetailsListStyles } from '@fluentui/react';

const stackTokens: IStackTokens = { childrenGap: 10 };

interface ExpandableListProps {
  title: string;
  content: { key: string; value: string }[];
}

const ExpandableList: React.FC<ExpandableListProps> = ({ title, content }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Define columns for the DetailsList (without header)
  const columns: IColumn[] = [
    {
      key: 'column1',
      name: '',
      fieldName: 'key',
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
      isMultiline: true,
    },
    {
      key: 'column2',
      name: '',
      fieldName: 'value',
      minWidth: 100,
      maxWidth: 300,
      isResizable: true,
      isMultiline: true,
    },
  ];

  // Styles for the DetailsList to add borders and hide header
  const detailsListStyles: Partial<IDetailsListStyles> = {
    root: {
      overflowX: 'auto',
    },
    contentWrapper: {
      selectors: {
        '.ms-DetailsRow': {
          borderBottom: '1px solid #ddd',
        },
        '.ms-DetailsRow-cell': {
          borderRight: '1px solid #ddd',
          paddingTop: '8px',
          paddingBottom: '8px',
        },
      },
    },
    headerWrapper: {
      display: 'none',
    },
  };

  return (
    <div>
      <Stack
        horizontal
        tokens={stackTokens}
        verticalAlign="center"
        onClick={toggleExpand}
        style={{ cursor: 'pointer', padding: '10px', borderBottom: '1px solid #ddd' }}
      >
        <IconButton
          iconProps={{ iconName: isExpanded ? 'ChevronUp' : 'ChevronDown' }}
          ariaLabel="Expand or collapse section"
          styles={{ root: { pointerEvents: 'none' } }}
        />
        <Text variant="large">{title}</Text>
      </Stack>

      {isExpanded && (
        <div style={{ marginTop: '10px', paddingLeft: '40px' }}>
          <DetailsList
            items={content}
            columns={columns}
            setKey="set"
            layoutMode={DetailsListLayoutMode.justified}
            styles={detailsListStyles}
            compact={true} // Makes the rows more compact
          />
        </div>
      )}
    </div>
  );
};

export default ExpandableList;

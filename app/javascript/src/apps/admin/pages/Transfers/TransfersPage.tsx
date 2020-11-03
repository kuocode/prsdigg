import {
  AdminTransferConnectionQueryHookResult,
  Transfer as ITransfer,
  useAdminTransferConnectionQuery,
} from '@graphql';
import { Avatar, Button, PageHeader, Space } from 'antd';
import Table, { ColumnProps } from 'antd/lib/table';
import React from 'react';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';

export default function TransfersPage() {
  const {
    data,
    loading,
    fetchMore,
  }: AdminTransferConnectionQueryHookResult = useAdminTransferConnectionQuery();

  if (loading) {
    return <LoadingComponent />;
  }
  const {
    adminTransferConnection: {
      nodes: transfers,
      pageInfo: { hasNextPage, endCursor },
    },
  } = data;
  const columns: Array<ColumnProps<ITransfer>> = [
    {
      dataIndex: 'traceId',
      key: 'traceId',
      title: 'Trace ID',
    },
    {
      dataIndex: 'recipient',
      key: 'recipient',
      render: (_, transfer) => (
        <Space>
          <Avatar src={transfer.recipient.avatarUrl} />
          <span>
            {transfer.recipient.name}({transfer.recipient.mixinId})
          </span>
        </Space>
      ),
      title: 'Recipient',
    },
    {
      dataIndex: 'amount',
      key: 'amount',
      title: 'Amount',
    },
    {
      dataIndex: 'transferType',
      key: 'transferType',
      title: 'transferType',
    },
    {
      dataIndex: 'processedAt',
      key: 'processedAt',
      render: (processedAt) => <span>{processedAt || '-'}</span>,
      title: 'Processed At',
    },
    {
      dataIndex: 'createdAt',
      key: 'createdAt',
      title: 'Created At',
    },
    {
      dataIndex: 'snapshotId',
      key: 'snapshotId',
      render: (snapshotId) => (
        <span>
          {snapshotId ? (
            <a
              href={`https://mixin.one/snapshots/${snapshotId}`}
              target='_blank'
            >
              View
            </a>
          ) : (
            'processing'
          )}
        </span>
      ),
      title: 'Snapshot',
    },
  ];

  return (
    <div>
      <PageHeader title='Transfers' />
      <Table
        scroll={{ x: true }}
        columns={columns}
        dataSource={transfers}
        rowKey='traceId'
        pagination={false}
      />
      <div style={{ margin: '1rem', textAlign: 'center' }}>
        <Button
          type='link'
          loading={loading}
          disabled={!hasNextPage}
          onClick={() => {
            fetchMore({
              updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) {
                  return prev;
                }
                const connection = fetchMoreResult.adminTransferConnection;
                connection.nodes = prev.adminTransferConnection.nodes.concat(
                  connection.nodes,
                );
                return Object.assign({}, prev, {
                  adminTransferConnection: connection,
                });
              },
              variables: {
                after: endCursor,
              },
            });
          }}
        >
          {hasNextPage ? 'Load More' : 'No More'}
        </Button>
      </div>
    </div>
  );
}

module.exports = ({ layout, name, record }) => {
  const server = process.env.SERVER;
  const database = process.env.DATABASE;
  const urls = {
    find: `${server}/fmi/data/v1/databases/${database}/layouts/${layout}/_find`,
    generateFMToken:`${server}/fmi/data/v1/databases/${database}/sessions`,
    get_record:`${server}/fmi/data/v1/databases/${database}/layouts/${layout}/records/${record}`,
    create_record:`${server}/fmi/data/v1/databases/${database}/layouts/${layout}/records`,
    create_note:`${server}/fmi/data/v1/databases/${database}/layouts/${layout}/records`,
    uploadImage:`${server}/fmi/data/v1/databases/${database}/layouts/${layout}/records/${record}/containers/image/1`,
    getTicket:`${server}/fmi/data/v1/databases/${database}/layouts/${layout}/records/${record}`
  };
  return urls[name]
};

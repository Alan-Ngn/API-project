'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const { Spot, SpotImage } = require('../models')

const spotImages = [
  {
    name: 'French Dirt Plot',
    url: 'https://www.naturesearthproducts.com/wp-content/uploads/product_images/product-3308-1655207193-100006-scaled.jpg',
    preview: true
  },
  {
    name: 'French Dirt Plot',
    url: 'https://www.naturesearthproducts.com/wp-content/uploads/product_images/product-3308-1655207193-100006-scaled.jpg',
    preview: false
  },
  {
    name: 'French Dirt Plot',
    url: 'https://www.naturesearthproducts.com/wp-content/uploads/product_images/product-3308-1655207193-100006-scaled.jpg',
    preview: false
  },
  {
    name: 'French Dirt Plot',
    url: 'https://www.naturesearthproducts.com/wp-content/uploads/product_images/product-3308-1655207193-100006-scaled.jpg',
    preview: false
  },
  {
    name: 'French Dirt Plot',
    url: 'https://www.naturesearthproducts.com/wp-content/uploads/product_images/product-3308-1655207193-100006-scaled.jpg',
    preview: false
  },

  {
    name: 'Spanish Dirt Plot',
    url: 'https://media.npr.org/assets/img/2022/12/02/gettyimages-1097796342-943eb8db689d4ab655679b743a5053f39627e301-s1100-c50.jpg',
    preview: true
  },
  {
    name: 'Spanish Dirt Plot',
    url: 'https://media.npr.org/assets/img/2022/12/02/gettyimages-1097796342-943eb8db689d4ab655679b743a5053f39627e301-s1100-c50.jpg',
    preview: false
  },
  {
    name: 'Spanish Dirt Plot',
    url: 'https://media.npr.org/assets/img/2022/12/02/gettyimages-1097796342-943eb8db689d4ab655679b743a5053f39627e301-s1100-c50.jpg',
    preview: false
  },
  {
    name: 'Spanish Dirt Plot',
    url: 'https://media.npr.org/assets/img/2022/12/02/gettyimages-1097796342-943eb8db689d4ab655679b743a5053f39627e301-s1100-c50.jpg',
    preview: false
  },
  {
    name: 'Spanish Dirt Plot',
    url: 'https://media.npr.org/assets/img/2022/12/02/gettyimages-1097796342-943eb8db689d4ab655679b743a5053f39627e301-s1100-c50.jpg',
    preview: false
  },

  {
    name: 'German Dirt Plot',
    url: 'https://cdn.shopify.com/s/files/1/0569/0615/4154/files/GettyImages-687716000.jpg',
    preview: true
  },
  {
    name: 'German Dirt Plot',
    url: 'https://cdn.shopify.com/s/files/1/0569/0615/4154/files/GettyImages-687716000.jpg',
    preview: false
  },
  {
    name: 'German Dirt Plot',
    url: 'https://cdn.shopify.com/s/files/1/0569/0615/4154/files/GettyImages-687716000.jpg',
    preview: false
  },
  {
    name: 'German Dirt Plot',
    url: 'https://cdn.shopify.com/s/files/1/0569/0615/4154/files/GettyImages-687716000.jpg',
    preview: false
  },
  {
    name: 'German Dirt Plot',
    url: 'https://cdn.shopify.com/s/files/1/0569/0615/4154/files/GettyImages-687716000.jpg',
    preview: false
  },

  {
    name: 'Polish Dirt Plot',
    url: 'https://dirtsoilandmore.com/wp-content/uploads/sites/12/2014/02/dirt.jpg',
    preview: true
  },
  {
    name: 'Polish Dirt Plot',
    url: 'https://dirtsoilandmore.com/wp-content/uploads/sites/12/2014/02/dirt.jpg',
    preview: false
  },
  {
    name: 'Polish Dirt Plot',
    url: 'https://dirtsoilandmore.com/wp-content/uploads/sites/12/2014/02/dirt.jpg',
    preview: false
  },
  {
    name: 'Polish Dirt Plot',
    url: 'https://dirtsoilandmore.com/wp-content/uploads/sites/12/2014/02/dirt.jpg',
    preview: false
  },
  {
    name: 'Polish Dirt Plot',
    url: 'https://dirtsoilandmore.com/wp-content/uploads/sites/12/2014/02/dirt.jpg',
    preview: false
  },

  {
    name: 'English Dirt Plot',
    url: 'https://img.freepik.com/free-photo/top-view-dark-soil-background_179666-40013.jpg',
    preview: true
  },
  {
    name: 'English Dirt Plot',
    url: 'https://img.freepik.com/free-photo/top-view-dark-soil-background_179666-40013.jpg',
    preview: false
  },
  {
    name: 'English Dirt Plot',
    url: 'https://img.freepik.com/free-photo/top-view-dark-soil-background_179666-40013.jpg',
    preview: false
  },
  {
    name: 'English Dirt Plot',
    url: 'https://img.freepik.com/free-photo/top-view-dark-soil-background_179666-40013.jpg',
    preview: false
  },
  {
    name: 'English Dirt Plot',
    url: 'https://img.freepik.com/free-photo/top-view-dark-soil-background_179666-40013.jpg',
    preview: false
  },

  {
    name: 'Dirt Patch #1',
    url: 'https://serbu.ca/wp-content/uploads/2021/05/fill-dirt1.jpg',
    preview: true
  },
  {
    name: 'Dirt Patch #1',
    url: 'https://serbu.ca/wp-content/uploads/2021/05/fill-dirt1.jpg',
    preview: false
  },
  {
    name: 'Dirt Patch #1',
    url: 'https://serbu.ca/wp-content/uploads/2021/05/fill-dirt1.jpg',
    preview: false
  },
  {
    name: 'Dirt Patch #1',
    url: 'https://serbu.ca/wp-content/uploads/2021/05/fill-dirt1.jpg',
    preview: false
  },
  {
    name: 'Dirt Patch #1',
    url: 'https://serbu.ca/wp-content/uploads/2021/05/fill-dirt1.jpg',
    preview: false
  },

  {
    name: 'Dirt Patch #2',
    url: 'https://www.smithbrosmulch.com/wp-content/uploads/2021/02/Fill-Dirt-2.jpg',
    preview: true
  },
  {
    name: 'Dirt Patch #2',
    url: 'https://www.smithbrosmulch.com/wp-content/uploads/2021/02/Fill-Dirt-2.jpg',
    preview: false
  },
  {
    name: 'Dirt Patch #2',
    url: 'https://www.smithbrosmulch.com/wp-content/uploads/2021/02/Fill-Dirt-2.jpg',
    preview: false
  },
  {
    name: 'Dirt Patch #2',
    url: 'https://www.smithbrosmulch.com/wp-content/uploads/2021/02/Fill-Dirt-2.jpg',
    preview: false
  },
  {
    name: 'Dirt Patch #2',
    url: 'https://www.smithbrosmulch.com/wp-content/uploads/2021/02/Fill-Dirt-2.jpg',
    preview: false
  },

  {
    name: 'Dirt Patch #3',
    url: 'https://upload.wikimedia.org/wikipedia/commons/7/75/Dried_mud_creeks_on_the_shores_of_the_Wash_-_geograph.org.uk_-_10669.jpg',
    preview: true
  },
  {
    name: 'Dirt Patch #3',
    url: 'https://upload.wikimedia.org/wikipedia/commons/7/75/Dried_mud_creeks_on_the_shores_of_the_Wash_-_geograph.org.uk_-_10669.jpg',
    preview: false
  },
  {
    name: 'Dirt Patch #3',
    url: 'https://upload.wikimedia.org/wikipedia/commons/7/75/Dried_mud_creeks_on_the_shores_of_the_Wash_-_geograph.org.uk_-_10669.jpg',
    preview: false
  },
  {
    name: 'Dirt Patch #3',
    url: 'https://upload.wikimedia.org/wikipedia/commons/7/75/Dried_mud_creeks_on_the_shores_of_the_Wash_-_geograph.org.uk_-_10669.jpg',
    preview: false
  },
  {
    name: 'Dirt Patch #3',
    url: 'https://upload.wikimedia.org/wikipedia/commons/7/75/Dried_mud_creeks_on_the_shores_of_the_Wash_-_geograph.org.uk_-_10669.jpg',
    preview: false
  },


  {
    name: 'Dirt Patch #4',
    url: 'https://cdn.shoplightspeed.com/shops/629542/files/15496185/1-yard-compactable-fill-dirt.jpg',
    preview: true
  },
  {
    name: 'Dirt Patch #4',
    url: 'https://cdn.shoplightspeed.com/shops/629542/files/15496185/1-yard-compactable-fill-dirt.jpg',
    preview: false
  },
  {
    name: 'Dirt Patch #4',
    url: 'https://cdn.shoplightspeed.com/shops/629542/files/15496185/1-yard-compactable-fill-dirt.jpg',
    preview: false
  },
  {
    name: 'Dirt Patch #4',
    url: 'https://cdn.shoplightspeed.com/shops/629542/files/15496185/1-yard-compactable-fill-dirt.jpg',
    preview: false
  },
  {
    name: 'Dirt Patch #4',
    url: 'https://cdn.shoplightspeed.com/shops/629542/files/15496185/1-yard-compactable-fill-dirt.jpg',
    preview: false
  },


  {
    name: 'Dirt Patch #5',
    url: 'https://mountainhighmulch.com/wp-content/uploads/2021/10/fill-dirt-630x473.jpg',
    preview: true
  },
  {
    name: 'Dirt Patch #5',
    url: 'https://mountainhighmulch.com/wp-content/uploads/2021/10/fill-dirt-630x473.jpg',
    preview: false
  },
  {
    name: 'Dirt Patch #5',
    url: 'https://mountainhighmulch.com/wp-content/uploads/2021/10/fill-dirt-630x473.jpg',
    preview: false
  },
  {
    name: 'Dirt Patch #5',
    url: 'https://mountainhighmulch.com/wp-content/uploads/2021/10/fill-dirt-630x473.jpg',
    preview: false
  },
  {
    name: 'Dirt Patch #5',
    url: 'https://mountainhighmulch.com/wp-content/uploads/2021/10/fill-dirt-630x473.jpg',
    preview: false
  },

  {
    name: 'Glorious Plot',
    url: 'https://golf.com/wp-content/uploads/2021/08/lawn-1024x576.jpg',
    preview: true
  },
  {
    name: 'Glorious Plot',
    url: 'https://golf.com/wp-content/uploads/2021/08/lawn-1024x576.jpg',
    preview: false
  },
  {
    name: 'Glorious Plot',
    url: 'https://golf.com/wp-content/uploads/2021/08/lawn-1024x576.jpg',
    preview: false
  },
  {
    name: 'Glorious Plot',
    url: 'https://golf.com/wp-content/uploads/2021/08/lawn-1024x576.jpg',
    preview: false
  },
  {
    name: 'Glorious Plot',
    url: 'https://golf.com/wp-content/uploads/2021/08/lawn-1024x576.jpg',
    preview: false
  },

  {
    name: 'Ant Paradise',
    url: 'https://cdn.zmescience.com/wp-content/uploads/2020/10/245835_web-1024x576.jpg',
    preview: true
  },
  {
    name: 'Ant Paradise',
    url: 'https://cdn.zmescience.com/wp-content/uploads/2020/10/245835_web-1024x576.jpg',
    preview: false
  },
  {
    name: 'Ant Paradise',
    url: 'https://cdn.zmescience.com/wp-content/uploads/2020/10/245835_web-1024x576.jpg',
    preview: false
  },
  {
    name: 'Ant Paradise',
    url: 'https://cdn.zmescience.com/wp-content/uploads/2020/10/245835_web-1024x576.jpg',
    preview: false
  },
  {
    name: 'Ant Paradise',
    url: 'https://cdn.zmescience.com/wp-content/uploads/2020/10/245835_web-1024x576.jpg',
    preview: false
  },

  {
    name: 'Scenic Plot of Dirt',
    url: 'https://upload.wikimedia.org/wikipedia/commons/4/45/River_Bank_Erosion_-_geograph.org.uk_-_565767.jpg',
    preview: true
  },
  {
    name: 'Scenic Plot of Dirt',
    url: 'https://upload.wikimedia.org/wikipedia/commons/4/45/River_Bank_Erosion_-_geograph.org.uk_-_565767.jpg',
    preview: false
  },
  {
    name: 'Scenic Plot of Dirt',
    url: 'https://upload.wikimedia.org/wikipedia/commons/4/45/River_Bank_Erosion_-_geograph.org.uk_-_565767.jpg',
    preview: false
  },
  {
    name: 'Scenic Plot of Dirt',
    url: 'https://upload.wikimedia.org/wikipedia/commons/4/45/River_Bank_Erosion_-_geograph.org.uk_-_565767.jpg',
    preview: false
  },
  {
    name: 'Scenic Plot of Dirt',
    url: 'https://upload.wikimedia.org/wikipedia/commons/4/45/River_Bank_Erosion_-_geograph.org.uk_-_565767.jpg',
    preview: false
  },

  {
    name: 'One Dirt Hill',
    url: 'https://t4.ftcdn.net/jpg/04/35/53/05/360_F_435530538_Cjh5pqDSuvNmkWQK7ckH8RJtGWqUPjWR.jpg',
    preview: true
  },
  {
    name: 'One Dirt Hill',
    url: 'https://t4.ftcdn.net/jpg/04/35/53/05/360_F_435530538_Cjh5pqDSuvNmkWQK7ckH8RJtGWqUPjWR.jpg',
    preview: false
  },
  {
    name: 'One Dirt Hill',
    url: 'https://t4.ftcdn.net/jpg/04/35/53/05/360_F_435530538_Cjh5pqDSuvNmkWQK7ckH8RJtGWqUPjWR.jpg',
    preview: false
  },
  {
    name: 'One Dirt Hill',
    url: 'https://t4.ftcdn.net/jpg/04/35/53/05/360_F_435530538_Cjh5pqDSuvNmkWQK7ckH8RJtGWqUPjWR.jpg',
    preview: false
  },
  {
    name: 'One Dirt Hill',
    url: 'https://t4.ftcdn.net/jpg/04/35/53/05/360_F_435530538_Cjh5pqDSuvNmkWQK7ckH8RJtGWqUPjWR.jpg',
    preview: false
  },

  {
    name: 'Ash Plot',
    url: 'https://i.natgeofe.com/n/8b8f3685-f097-4057-8542-dfaf8b44bf97/MM9797_210919_1650_4x3.jpg',
    preview: true
  },
  {
    name: 'Ash Plot',
    url: 'https://i.natgeofe.com/n/8b8f3685-f097-4057-8542-dfaf8b44bf97/MM9797_210919_1650_4x3.jpg',
    preview: false
  },
  {
    name: 'Ash Plot',
    url: 'https://i.natgeofe.com/n/8b8f3685-f097-4057-8542-dfaf8b44bf97/MM9797_210919_1650_4x3.jpg',
    preview: false
  },
  {
    name: 'Ash Plot',
    url: 'https://i.natgeofe.com/n/8b8f3685-f097-4057-8542-dfaf8b44bf97/MM9797_210919_1650_4x3.jpg',
    preview: false
  },
  {
    name: 'Ash Plot',
    url: 'https://i.natgeofe.com/n/8b8f3685-f097-4057-8542-dfaf8b44bf97/MM9797_210919_1650_4x3.jpg',
    preview: false
  },

  {
    name: 'Soily Soil',
    url: 'https://2.bp.blogspot.com/--GNmi1oB40o/UVBmhU6tpWI/AAAAAAAAAII/f41C3C_Y_7g/s1600/dirt_soil_lg.jpg',
    preview: true
  },
  {
    name: 'Soily Soil',
    url: 'https://2.bp.blogspot.com/--GNmi1oB40o/UVBmhU6tpWI/AAAAAAAAAII/f41C3C_Y_7g/s1600/dirt_soil_lg.jpg',
    preview: false
  },
  {
    name: 'Soily Soil',
    url: 'https://2.bp.blogspot.com/--GNmi1oB40o/UVBmhU6tpWI/AAAAAAAAAII/f41C3C_Y_7g/s1600/dirt_soil_lg.jpg',
    preview: false
  },
  {
    name: 'Soily Soil',
    url: 'https://2.bp.blogspot.com/--GNmi1oB40o/UVBmhU6tpWI/AAAAAAAAAII/f41C3C_Y_7g/s1600/dirt_soil_lg.jpg',
    preview: false
  },
  {
    name: 'Soily Soil',
    url: 'https://2.bp.blogspot.com/--GNmi1oB40o/UVBmhU6tpWI/AAAAAAAAAII/f41C3C_Y_7g/s1600/dirt_soil_lg.jpg',
    preview: false
  },

  {
    name: 'Dirty Dirt',
    url: 'https://cfaes.osu.edu/sites/cfaes_main/files/site-library/site-images/news/GettyImages-1152392832.jpg',
    preview: true
  },
  {
    name: 'Dirty Dirt',
    url: 'https://cfaes.osu.edu/sites/cfaes_main/files/site-library/site-images/news/GettyImages-1152392832.jpg',
    preview: false
  },
  {
    name: 'Dirty Dirt',
    url: 'https://cfaes.osu.edu/sites/cfaes_main/files/site-library/site-images/news/GettyImages-1152392832.jpg',
    preview: false
  },
  {
    name: 'Dirty Dirt',
    url: 'https://cfaes.osu.edu/sites/cfaes_main/files/site-library/site-images/news/GettyImages-1152392832.jpg',
    preview: false
  },
  {
    name: 'Dirty Dirt',
    url: 'https://cfaes.osu.edu/sites/cfaes_main/files/site-library/site-images/news/GettyImages-1152392832.jpg',
    preview: false
  },

  {
    name: 'Compost Land',
    url: 'https://npr.brightspotcdn.com/dims4/default/b695898/2147483647/strip/true/crop/1254x836+0+0/resize/880x587!/quality/90/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2Flegacy%2Fsites%2Fvpr%2Ffiles%2F201809%2Fcomposting-container-istock-curtoicurto.jpg',
    preview: true
  },
  {
    name: 'Compost Land',
    url: 'https://npr.brightspotcdn.com/dims4/default/b695898/2147483647/strip/true/crop/1254x836+0+0/resize/880x587!/quality/90/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2Flegacy%2Fsites%2Fvpr%2Ffiles%2F201809%2Fcomposting-container-istock-curtoicurto.jpg',
    preview: false
  },
  {
    name: 'Compost Land',
    url: 'https://npr.brightspotcdn.com/dims4/default/b695898/2147483647/strip/true/crop/1254x836+0+0/resize/880x587!/quality/90/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2Flegacy%2Fsites%2Fvpr%2Ffiles%2F201809%2Fcomposting-container-istock-curtoicurto.jpg',
    preview: false
  },
  {
    name: 'Compost Land',
    url: 'https://npr.brightspotcdn.com/dims4/default/b695898/2147483647/strip/true/crop/1254x836+0+0/resize/880x587!/quality/90/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2Flegacy%2Fsites%2Fvpr%2Ffiles%2F201809%2Fcomposting-container-istock-curtoicurto.jpg',
    preview: false
  },
  {
    name: 'Compost Land',
    url: 'https://npr.brightspotcdn.com/dims4/default/b695898/2147483647/strip/true/crop/1254x836+0+0/resize/880x587!/quality/90/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2Flegacy%2Fsites%2Fvpr%2Ffiles%2F201809%2Fcomposting-container-istock-curtoicurto.jpg',
    preview: false
  },

  {
    name: 'Trash and Dirt Plot',
    url: 'https://cloudfront-us-east-1.images.arcpublishing.com/opb/7ZZFYI3GLVB4XFRN6PUD6GR6F4.jpg',
    preview: true
  },
  {
    name: 'Trash and Dirt Plot',
    url: 'https://cloudfront-us-east-1.images.arcpublishing.com/opb/7ZZFYI3GLVB4XFRN6PUD6GR6F4.jpg',
    preview: false
  },
  {
    name: 'Trash and Dirt Plot',
    url: 'https://cloudfront-us-east-1.images.arcpublishing.com/opb/7ZZFYI3GLVB4XFRN6PUD6GR6F4.jpg',
    preview: false
  },
  {
    name: 'Trash and Dirt Plot',
    url: 'https://cloudfront-us-east-1.images.arcpublishing.com/opb/7ZZFYI3GLVB4XFRN6PUD6GR6F4.jpg',
    preview: false
  },
  {
    name: 'Trash and Dirt Plot',
    url: 'https://cloudfront-us-east-1.images.arcpublishing.com/opb/7ZZFYI3GLVB4XFRN6PUD6GR6F4.jpg',
    preview: false
  },

  {
    name: 'Muddy Plot',
    url: 'https://cfaes.osu.edu/sites/cfaes_main/files/site-library/site-images/news/GettyImages-1142679668.jpg',
    preview: true
  },
  {
    name: 'Muddy Plot',
    url: 'https://cfaes.osu.edu/sites/cfaes_main/files/site-library/site-images/news/GettyImages-1142679668.jpg',
    preview: false
  },
  {
    name: 'Muddy Plot',
    url: 'https://cfaes.osu.edu/sites/cfaes_main/files/site-library/site-images/news/GettyImages-1142679668.jpg',
    preview: false
  },
  {
    name: 'Muddy Plot',
    url: 'https://cfaes.osu.edu/sites/cfaes_main/files/site-library/site-images/news/GettyImages-1142679668.jpg',
    preview: false
  },
  {
    name: 'Muddy Plot',
    url: 'https://cfaes.osu.edu/sites/cfaes_main/files/site-library/site-images/news/GettyImages-1142679668.jpg',
    preview: false
  }
];

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    for (let spotImageInfo of spotImages) {
      const { name, url, preview } = spotImageInfo;
      const foundSpot = await Spot.findOne({
        where: { name: spotImageInfo.name }
      });
      await SpotImage.create({
        spotId: foundSpot.id,
        url,
        preview
      })
    }
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete(options, {
      url: spotImages.map(ele => ele.url)
    }, {});
  }
};

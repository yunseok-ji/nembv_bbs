const Company = require('./models/companies');
const Group = require('./models/groups');
//쓰기
// exports.test = {
//   model: () => {
//     console.log('모델 테스트');
//
//     // const cp = new Company({
//     //   name: '테스트2'
//     // });
//
//     Company.create({ name: '테스트222' })
//       .then((r) =>{
//          console.log(r);
//       })
//       .catch(err => console.error(err));
//   },
// };

// 읽기
// exports.test = {
//   model: () => {
//     console.log('모델 테스트');
//
//     Company.findOne({ name: '테스트222' })
//       .then((r) => {
//         console.log(r);
//       })
//       .catch(err => console.error(err));
//   },
// };


// exports.test = {
//   model: () => {
//     console.log('모델 테스트');
//
//     Company.findOne({ name: '테스트2' })
//       .then((cp) => {
//          if (!cp) throw new Error('회사가 존재하지 않음');
//
//         const gr = new Group({
//           name: '소속1',
//           cp_id: cp._id,
//         });
//         return gr.save();
//       })
//       .then((gr) => {
//         console.log(gr);
//         return Company.update({ _id: gr.cp_id }, { $addToSet: { gr_ids : gr._id } });
//       })
//       .then((r) => {
//         console.log(r);
//       })
//       .catch(err => console.error(err));
//   },
// };


exports.test = {
  model: () => {
    console.log('모델 테스트');

    Company.findOne({ name: '테스트2' })
      .then((cp) => {
        if (!cp) throw new Error('회사가 존재하지 않음');
        const gr = new Group({
          name: '소속2',
          cp_id: cp._id,
        });
        return gr.save();
      })
      .then((gr) => {
        return Company.findOneAndUpdate(
          { _id: gr.cp_id },
          { $addToSet: { gr_ids : gr._id } },
          { new: true })
          .populate('gr_ids');
      })
      .then((r) => {
        console.log(r);
      })
      .catch(err => console.error(err));
  },
};

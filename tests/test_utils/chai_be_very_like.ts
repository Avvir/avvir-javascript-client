const deepEql = require("tolerant-deep-eql");

const DEFAULT_TOLERANCE = 1.0e-6;

export default function (chai, utils) {
  function makePlain(object) {
    if (object == null) {
      return null;
    } else {
      return JSON.parse(JSON.stringify(object));
    }
  }

  function roughly(expected, msg) {
    if (DEFAULT_TOLERANCE) {
      if (msg) {
        utils.flag(this, "message", msg);
      }

      this.assert(
        deepEql(makePlain(expected), makePlain(utils.flag(this, "object")), { tolerance: 0.000000001 })
        , `expected #{act} to be very like #{exp}, but it was ${JSON.stringify(utils.flag(this, "object"))}`
        , `expected #{act} to not be so very like #{exp}, but it was ${JSON.stringify(utils.flag(this, "object"))}`
        , expected
        , utils.flag(this, "object")
        , true
      );
    }
  }

  chai.Assertion.addMethod("beVeryLike", roughly);
};

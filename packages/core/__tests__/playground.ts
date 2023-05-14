import {
  array,
  assert,
  is,
  literal,
  never,
  number,
  object,
  string,
  tuple,
  type,
  union,
} from "@almadoro/uv-core";

declare class CustomClass {}

type({
  prop: "const",
});

const Article = type({
  id: type(number),
  title: string,
  tags: array(string),
  author: {
    aConstNumer: 456,
    aConstTrue: true,
    id: number,
    "nested?": {
      stringNested: "string",
      deepNestedOptStr: number,
    },
  },
  aCustomClass: CustomClass,
  aDate: Date,
  shouldBeTrue: true,
  shouldBeFalse: false,
  shouldBeUndefined: undefined,
  shouldBeNull: null,
  "anOptionalNum?": number,
  aConstNumber: 123,
  aConstString: "123",
  aTuple: [string, "123"],
  anEmptyTuple: [],
  anUnion: union(string, number, { id: number, __type: "USER" }),
  // aNestedArticle: () => Article,
});

const temp = null as unknown;

if (Article.is(temp)) {
  temp.aDate.toISOString();
  temp.aConstNumber === 123;
  temp.aConstString === "123";
  temp.shouldBeFalse === false;
  temp.shouldBeNull;
  temp.author.nested?.stringNested;
  temp.author.aConstNumer;
  temp.author.aConstTrue;
  temp.aCustomClass;
  temp.aTuple[0];
  temp.aTuple[1];
  temp.anOptionalNum;
  temp.anUnion;
  // temp["anOptionalNum?"];
}

if (type(["asd", "dfg", { prop1: number, constNumb: 123 }, 789]).is(temp)) {
  const c = temp[0];
  const c2 = temp[2].prop1;
  const c3 = temp[2].constNumb;
  const c4 = temp[3];
}

if (type({ asd: "123" } as Record<string, string>).is(temp)) {
  const c = temp.asd;
}

if (type(["asd"] as string[]).is(temp)) {
  const c = temp[0];
}

if (
  type({ anArray: ["asd", "dfg", { reallyNested: ["wao", "nah"] }] }).is(temp)
) {
  const c = temp.anArray[0];
  const c2 = temp.anArray[2].reallyNested[0];
}

const temp1 = null as unknown;

if (array({ constStr: "USER", str: string }).is(temp1)) {
  temp1[0].constStr;
}

if (
  tuple({ constStr: "USER", str: string }, { constStr: "NOT_USER" }).is(temp1)
) {
  temp1[0].constStr;
}

// api
// GET user/:id

const user = type({
  id: string,
  prop: union(
    {
      "id?": string,
      name: string,
    },
    type({
      id: number,
      "name?": never,
    })
  ),
  names: ["NAME", string, "LASTNAME", string],
  prop1: {
    obj: {
      id: "ASD",
    },
  },
  age: number,
  type: "USER",
});

// RESOLVER endpoint

let data: unknown;
if (is(data, user)) {
  data.names[2] === "LASTNAME";
}

if (is(data, { __type: "USER", id: string, "name?": string, age: number })) {
  data.__type === "USER";
}

if (is(data, literal("123"))) {
  data;
}

const QuotePostBody = type({
  clientInfo: object,
  quoteInfo: {
    presellPaymentPercent: string,
    finalPrice: string,
    downPayment: string,
    numberOfMonths: string,
    monthlyPayment: string,
    "totalExtraPayments?": string,
    presellPayment: string,
    remainingAmount: string,
  },
  inventoryItem: {
    id: string,
    type: union("typology", "union"),
    // [key.string]: unknown,
  },
});

let a: unknown;
if (QuotePostBody.is(a)) {
  a.quoteInfo.totalExtraPayments;
  if (a.inventoryItem.type === "typology") a.inventoryItem.id;
}

type TEST1 = { prop1: number } & ({ prop2: string } | { prop3: boolean });
type TEST2 = { prop1: number };
type TEST3 =
  | { prop2: string; prop3?: never }
  | { prop2: number; prop3: boolean };
// Same as   { prop2: string } | (({ prop2: number }) & ({ prop3: boolean }))
type TEST4 = { prop2: string };
type TEST5 = { prop1: number } & ({ prop2: string } | string);

const test1: TEST1 = {
  prop1: 123,
  prop2: "",
  prop3: true,
};

const test3: TEST3 = {
  prop2: "123",
  // prop3: false,
};

function testy(arg: TEST3) {
  if (typeof arg.prop2 === "string") {
    arg.prop2;
  } else {
    arg.prop2;
    arg.prop3;
  }
}

/**
 * Ideal TEST2:
 *
 * > Check prop1 is number
 * > No other properties should exists
 *
 * Ideal TEST4
 *
 * > Check prop2 is string
 * > No other properties should exists
 *
 * Ideal TEST 3
 *
 * Try to match:
 *  Check prop2 is string
 *  No other properties should exists
 * Try to match:
 *  Check prop3 is boolean
 *  No other properties should exists
 * >
 *
 * Ideal TEST 1
 *
 * > Check prop1 is number
 * > No other properties should exists
 * Try to match:
 *  Check prop2 is string
 *  No other properties should exists
 * Try to match:
 *  Check prop3 is boolean
 *  No other properties should exists
 */

const t1 = null as unknown;
assert(t1, { prop: { supernested: ["asd", 123] } });
t1.prop.supernested[0];

const strarr: string[] = [];
const t2 = null as unknown;
assert(t2, tuple(...strarr));
t2;

const tt = type(null as any);

type TESTT = Required<{ prop?: undefined }>;
type TESTT2 = Required<Partial<{ [K: string]: string }>>;
type TESTT3 = { prop?: number } & { prop: number };

const t: TESTT = { prop: undefined };
const t22: TESTT2 = {
  prp: undefined,
};

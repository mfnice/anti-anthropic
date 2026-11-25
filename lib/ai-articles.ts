import type { AINewsItem } from "./ai-news";
import type { Locale } from "./i18n";

type ArticleCopy = AINewsItem["copy"][Locale] & { body: string[] };

export interface AIArticle extends AINewsItem {
  copy: Record<Locale, ArticleCopy>;
}

export const AI_ARTICLES_UPDATED_AT = "2026-11-26";

export const AI_ARTICLES: AIArticle[] = [
  {
    id: "anthropic-authors-library",
    date: "2026-11-26",
    category: "opinion",
    copy: {
      zh: {
        title: "Anthropic 整库下载，作者却得逐本追账",
        summary: "Bartz 案的首轮和解款预计本周发出。从公司整库下载到作者逐本申领，最费事的那一头落在了谁身上？",
        body: [
          "在 Bartz 案中，联邦法官记录了 Anthropic 怎样给自己建书库。它从盗版网站免费下载了七百多万份图书副本，再从中挑选材料训练模型。有的书已经决定不用，公司仍留着副本，以备将来之需。对公司来说，先拿走一本书，甚至比决定要不要用它还容易。",
          "2025 年 6 月 23 日，法院认定本案涉及的模型训练属于合理使用。对那些买下纸书、扫描后销毁纸本的操作，法院也接受了以数字副本替代纸本的理由。但谈到从盗版网站取书并长期留存，公司提出的合理使用抗辩没有过关。我们批评的，正是 Anthropic 在挑选训练材料之前就替作者做了决定。",
          "法院于 2026 年 7 月批准了 15 亿美元和解。赔偿按和解作品清单审核。管理员预计从 11 月 23 日当周开始分期付款，一部作品的权利人若对分配有争议，还要等下一轮。公司可以整库下载，作家却得逐本认领、核对份额。Anthropic 今后每收一本书，就该留下一份作者可查询的来源记录，说明副本从哪来、用在哪里、还留着几份。",
        ],
      },
      en: {
        title: "Anthropic downloaded books in bulk. Authors have to claim them one at a time",
        summary: "The first settlement payments in Bartz were scheduled for this week. The claims process shows who does the work when a lab takes the books first and sorts out the rights later.",
        body: [
          "The judge in Bartz described how Anthropic built its library. It downloaded more than seven million copies of books from pirate sites without paying for them, then selected material for training. Even when it ruled out using particular copies for training, it kept them in case they proved useful. Acquiring a book took less deliberation than deciding whether to read it into a model.",
          "On June 23, 2025, the court found the training use at issue to be fair use. It also accepted Anthropic’s practice of buying printed books, scanning them and destroying the paper copies. The fair-use defense for collecting and retaining the pirated library copies failed. Anthropic had already made a consequential choice about authors’ work before anyone picked a training set.",
          "The court approved a $1.5 billion settlement in July 2026. Awards cover eligible titles on the settlement list. The administrator expected the first installment to go out the week of November 23. If rightsholders disagree on how to split a payment, the work waits for a later round. Anthropic could take a whole collection at once. An author has to claim each title and check the allocation. For each book it acquires from now on, the company owes the author a record they can check showing where it came from, how it was used and how many copies remain.",
        ],
      },
      es: {
        title: "Anthropic descargó libros en bloque. Los autores tienen que reclamarlos uno por uno",
        summary: "Los primeros pagos del acuerdo de Bartz estaban previstos para esta semana. El trámite deja ver quién carga con el trabajo de aclarar los derechos después de una descarga masiva.",
        body: [
          "El juez del caso Bartz explicó cómo Anthropic reunió su biblioteca. La empresa descargó gratis más de siete millones de copias de libros de sitios piratas. Después eligió material para entrenar sus modelos. Incluso cuando descartó ciertas copias para el entrenamiento, las conservó por si algún día le servían. Le resultó más fácil hacerse con un libro que decidir si lo iba a usar.",
          "El 23 de junio de 2025, el tribunal consideró que el entrenamiento examinado en el caso constituía un uso legítimo. También avaló la práctica de comprar libros impresos, escanearlos y destruir el ejemplar en papel. En cuanto a la descarga y conservación de copias piratas para la biblioteca, rechazó esa defensa. Antes incluso de elegir qué textos entrarían en el entrenamiento, Anthropic ya había decidido qué hacer con la obra de los autores.",
          "En julio de 2026 el tribunal aprobó un acuerdo de 1.500 millones de dólares. Los pagos corresponden a obras incluidas en la lista del acuerdo. El administrador preveía iniciar los pagos la semana del 23 de noviembre. Si los titulares discrepan sobre el reparto, deben esperar a otra ronda. Anthropic pudo descargar colecciones enteras. A los escritores les toca reclamar cada título y comprobar su parte. Por cada libro que adquiera en adelante, la empresa debería ofrecer a su autor un registro que le permita consultar de dónde salió, para qué se usó y cuántas copias quedan.",
        ],
      },
    },
    sources: [
      { label: "N.D. California · Order on Fair Use (Dkt. 231)", url: "https://assets-us-01.kc-usercontent.com/1eeb16db-4934-006e-40a6-38fa91285ebb/4cf4aba9-070f-48cd-b713-f52c20fe3975/Dkt.%20231%20-%20Order%20on%20Fair%20Use.pdf" },
      { label: "N.D. California · Final approval (Dkt. 680)", url: "https://assets-us-01.kc-usercontent.com/1eeb16db-4934-006e-40a6-38fa91285ebb/36cce252-a32c-4cbb-a624-31dd8ac9574c/2026-07-20%20Order%20Granting%20Final%20_dckt%20680_0_.pdf" },
      { label: "Bartz v. Anthropic · Payment status", url: "https://www.anthropiccopyrightsettlement.com/" },
    ],
  },
  {
    id: "anthropic-chat-retention",
    date: "2026-11-26",
    category: "opinion",
    copy: {
      zh: {
        title: "给 Claude 的一句回答打差评，为什么要交出整段对话？",
        summary: "在消费版 Claude 里，通过点踩按钮提交反馈，Anthropic 可把相关整段对话保留最长五年。纠正一个回答，值得付出这样的隐私代价吗？",
        body: [
          "假设你先请 Claude 润色一份求职信，再问它某家公司的地址。地址答错了，你想报个错。按 Anthropic 对 Free、Pro 和 Max 用户的说明，通过拇指按钮提交反馈，公司会把这段对话完整保存，最长五年。这意味着那封求职信也可能随错误地址一起留下。公司表示，使用反馈前会将其与用户标识分离，反馈也可能用于训练模型。",
          "平常删除聊天是另一套规则。对话会立即从历史记录消失，后台通常在三十天内删除。如果用户打开模型改进开关，之后新建或重新开始的聊天可经过去标识处理，在训练流程中保留最长五年。再关掉开关，公司承诺将这些聊天排除在未来的常规模型训练之外。已经开始的训练会继续使用先前纳入的数据，已经训练好的模型也保持原样。",
          "Anthropic 应当把举证责任揽回去。报告一个错误地址，公司需要看到哪个问题、哪句回答，完全说得清楚。让用户先预览并勾选要提交的几轮对话。如果整段记录确实有助于复现问题，再说明理由，单独征求同意。愿意替 Claude 挑错的人，值得一个能只交出那道错题的按钮。",
        ],
      },
      en: {
        title: "Why should one bad Claude answer cost a whole conversation?",
        summary: "Submit feedback through a thumbs-down button on a consumer Claude account and Anthropic can keep the entire exchange for up to five years. That is a steep price for reporting one mistake.",
        body: [
          "Imagine asking Claude to edit a cover letter and then asking for the employer’s address. The address is wrong, so you send feedback. Anthropic tells Free, Pro and Max users that it keeps the whole conversation associated with a thumbs-up or thumbs-down report for up to five years. The letter can go along with the bad address. The company says it separates feedback from the user’s ID before use and may use it to train models.",
          "Ordinary chat deletion follows a different timetable. A deleted chat disappears from the user’s history immediately, and Anthropic normally clears it from backend storage within 30 days. If the user enables model improvement, de-identified data from new or resumed chats can stay in the training pipeline for up to five years. Switching the setting off excludes those conversations from future general model training. It leaves training already underway and models already trained unaffected.",
          "Anthropic should have to make the case for every extra turn it collects. An incorrect address is easy to illustrate with a question and an answer. Let the person filing the report preview those turns and choose what to send. If reproducing the error really takes the whole exchange, explain why and ask separately. Someone doing Claude the favor of correcting an answer deserves that much control.",
        ],
      },
      es: {
        title: "¿Por qué corregir una respuesta de Claude cuesta una conversación entera?",
        summary: "Al enviar una valoración negativa en la versión de Claude para particulares, Anthropic puede conservar toda la conversación hasta cinco años. Es un precio excesivo por señalar un error.",
        body: [
          "Imagina que le pides a Claude que revise una carta de presentación y después le preguntas por la dirección de la empresa. Se equivoca de dirección y envías una valoración para avisar. Según explica Anthropic a quienes usan Free, Pro y Max, cuando envías una valoración con uno de los botones del pulgar, guarda la conversación entera hasta cinco años. La carta puede quedar archivada junto a la dirección errónea. La empresa afirma que desvincula la valoración del identificador del usuario antes de utilizarla y que puede usarla para entrenar modelos.",
          "El borrado habitual de un chat tiene otros plazos. La conversación desaparece de inmediato del historial y Anthropic suele eliminarla de sus sistemas en treinta días. Si el usuario activa la opción de mejora del modelo, la empresa puede conservar hasta cinco años, para el entrenamiento, datos desidentificados de las conversaciones nuevas o reanudadas. Desactivar la opción excluye esas conversaciones de futuros entrenamientos generales. Los entrenamientos en curso siguen adelante y los modelos ya entrenados se mantienen tal cual.",
          "Le corresponde a Anthropic justificar cuántos mensajes necesita para investigar un fallo. Para señalar una dirección equivocada bastan la pregunta y la respuesta. Quien envía el aviso debería poder revisar y elegir los mensajes que va a compartir. Si hace falta la conversación entera para reproducir el problema, la empresa debería explicar el motivo y pedir permiso aparte. Ese sería un trato justo para quien se toma la molestia de corregir a Claude.",
        ],
      },
    },
    sources: [
      { label: "Anthropic · Feedback and model training", url: "https://privacy.claude.com/en/articles/10023580-is-my-data-used-for-model-training" },
      { label: "Anthropic · Consumer data retention", url: "https://privacy.claude.com/en/articles/10023548-how-long-do-you-store-my-data" },
      { label: "Anthropic · Model improvement settings", url: "https://privacy.claude.com/en/articles/12109829-how-do-i-change-my-model-improvement-privacy-settings" },
    ],
  },
  {
    id: "anthropic-safety-compute-review",
    date: "2026-11-26",
    category: "opinion",
    copy: {
      zh: {
        title: "Anthropic 建议独立核验安全算力，却中途取消了自己的核验项目",
        summary: "Anthropic 公布过一个数字：在它抽取的一周里，约 6% 的 AI 研发算力用于安全工作。读这个数字时，值得追问谁有机会替公众核对这笔账。",
        body: [
          "Anthropic 统计了 2026 年 7 月 13 日至 20 日的算力使用情况。按公司的分类，约 6% 的 AI 研发算力花在安全工作上。公司也交代了局限：设计安全实验很费人力，用到的算力却可能很少。这个数字本来就回答不了「公司有多重视安全」这样的大问题，连哪些任务能算进这 6%，都需要有人复核。",
          "Anthropic 自己就建议，让独立第三方检查任务分类。评估机构 METR 原本接下了相当具体的工作，要核验 Anthropic 如何在能力开发和安全工作之间分配算力。METR 在 11 月 5 日的报告中写道，项目做到一半，Anthropic 取消了这一项。公司给出的理由是先集中评估风险，以后再谈算力核验。取消时，评估人员还没有得出实质结论。",
          "我们批评的是 Anthropic 给自己留下的这项权力：它既能建议同行把账交给外人查，也能在外人查到一半时把这一项划掉。下一次它再引用安全算力占比，就该在数字旁写清楚，谁核过分类、核到了哪一步、还有哪些分歧。读者才知道这份数字值得多少信任。",
        ],
      },
      en: {
        title: "Anthropic called for independent checks on safety compute. Then it cut its own review short.",
        summary: "Anthropic put the safety share of its AI research compute at about 6% for one week. Who got to check which jobs counted?",
        body: [
          "Anthropic tallied its computing workloads for July 13–20, 2026. By its count, safety work took about 6% of AI research and development compute. The company offered a fair caveat. Designing a safety experiment can take a researcher weeks even if running it costs little. And the figure depends on which jobs the company puts in the safety column.",
          "Anthropic itself proposed having outsiders check those classifications. METR, an independent evaluator, had a contract that included verifying how Anthropic divided compute between capabilities and safety. In its November 5 report, METR said Anthropic removed that part of the project midway, before the evaluators could reach substantive conclusions. Anthropic told METR it wanted to focus on risk assessment and would revisit the compute work later.",
          "The troubling part is who held the pencil. The company recommending independent checks could also strike one from the contract while it was under way. The next time Anthropic cites a safety compute figure, it should put the review record beside it. Who checked the classifications? How far did they get? Which judgments did they dispute? Readers deserve to know how much confidence the number has earned.",
        ],
      },
      es: {
        title: "Anthropic pidió verificar el cómputo dedicado a la seguridad. Después canceló su propia revisión.",
        summary: "Según Anthropic, la seguridad recibió cerca del 6 % del cómputo de I+D en IA durante una semana. ¿Quién pudo comprobar qué tareas entraron en esa cuenta?",
        body: [
          "Anthropic examinó el uso de sus recursos informáticos del 13 al 20 de julio de 2026. Según su clasificación, cerca del 6 % del cómputo de I+D en IA correspondió a tareas de seguridad. La propia empresa señaló un límite razonable. Diseñar un experimento puede exigir mucho tiempo aunque ejecutarlo cueste poco. Además, el porcentaje depende de cómo se clasifique cada tarea.",
          "Anthropic recomendó que un tercero comprobara esas clasificaciones. El contrato con METR, un evaluador independiente, incluía verificar el reparto de recursos entre el desarrollo de capacidades y la seguridad. En su informe del 5 de noviembre, METR explicó que Anthropic retiró esa parte del encargo a medio camino, antes de que los evaluadores llegaran a conclusiones sustantivas. La empresa alegó que quería concentrarse en evaluar riesgos y que retomaría la cuestión más adelante.",
          "Lo cuestionable es que Anthropic pueda recomendar una verificación externa y suprimirla cuando ya está en marcha. La próxima vez que cite un porcentaje, debería acompañarlo del historial de la revisión. ¿Quién comprobó la clasificación? ¿Hasta dónde llegó? ¿En qué hubo desacuerdo? Así el lector podrá juzgar cuánto crédito merece la cifra.",
        ],
      },
    },
    sources: [
      { label: "Anthropic · Measuring compute allocation", url: "https://www.anthropic.com/institute/measuring-pace-of-ai-development" },
      { label: "METR · Independent assessment and scope of the review", url: "https://metr.org/blog/2026-11-05-anthropic-ai-rd-acceleration-assessment/" },
    ],
  },
  {
    id: "anthropic-below-ipo-price",
    date: "2026-11-25",
    category: "opinion",
    copy: {
      zh: {
        title: "评论｜Anthropic 跌破发行价，83 美元凭什么算便宜？",
        summary: "上市第四个交易日，Anthropic 收在 81.91 美元。股价可以四天就改写，公司给微软的算力订单却一直排到 2033 年。",
        body: [
          "同一只股票，两笔不同的账。11 月 19 日，Anthropic 在纳斯达克上市，首日收于 97.17 美元。到 11 月 24 日收盘，按 83 美元发行价认购的人每股账面亏了 1.09 美元，按首日收盘价买入的人每股亏了 15.26 美元。把 83 美元当成便宜与昂贵的分界线，唯一的依据就是发行时恰好定了这个价。",
          "看多的一方有理由谈增长。招股书显示，2026 年前九个月，Anthropic 营收约 332 亿美元，经营亏损从上年同期约 52 亿美元收窄到 13 亿美元。但其中一份微软合同规定，从 2026 年 11 月到 2033 年 6 月，Anthropic 至少要花 472 亿美元，实际用了多少算力都按这个下限结算。",
          "给 Anthropic 开高价的人，至少该把这笔账算完。假如为了留住客户，Claude 每次调用都得降价，公司要多卖多少次调用，才能付清已经订下的算力，还让股东赚到钱？只拿首日收盘价来证明今天有折扣，就是把最难算的一项留白了。",
        ],
      },
      en: {
        title: "Opinion | Anthropic broke its IPO price. Who decided $83 was cheap?",
        summary: "Anthropic closed its fourth trading session at $81.91. The market took four sessions to rethink the price. A compute contract with Microsoft runs into 2033.",
        body: [
          "Two buyers of the same stock had very different weeks. Anthropic closed its Nasdaq debut on November 19 at $97.17. By the November 24 close, a buyer who paid the $83 offer price was down $1.09 a share on paper. Someone who bought at the first close was down $15.26. The case for treating $83 as the dividing line between cheap and expensive rests on the price the offering happened to fetch.",
          "The bulls have a serious case on growth. Anthropic reported about $33.2 billion in revenue for the first nine months of 2026. Its operating loss narrowed to about $1.3 billion from $5.2 billion a year earlier. The same prospectus describes a Microsoft contract under which Anthropic committed to spend at least $47.2 billion from November 2026 through June 2033, however much capacity it actually uses.",
          "Anyone defending a premium for Anthropic owes investors one more calculation. Suppose Claude has to charge less per call to keep customers. How many more calls would it take to pay for the compute already on order and still earn shareholders a profit? Calling the stock a bargain because it once closed at $97.17 leaves the hardest part of that calculation blank.",
        ],
      },
      es: {
        title: "Opinión | Anthropic cae por debajo de los 83 dólares. ¿Quién dijo que era una ganga?",
        summary: "Anthropic cerró su cuarta sesión en 81,91 dólares. En cuatro sesiones cambió la cotización. El contrato de capacidad de cómputo con Microsoft llega hasta 2033.",
        body: [
          "Dos personas que compraron la misma acción pueden hacer cuentas muy distintas. El 19 de noviembre, Anthropic cerró su primera sesión en el Nasdaq a 97,17 dólares. Al cierre del 24, quien había pagado los 83 dólares de la oferta acumulaba una pérdida latente de 1,09 dólares por acción. Para quien compró al primer cierre, la pérdida era de 15,26 dólares. Tomar los 83 dólares como frontera entre caro y barato exige creer que el precio fijado en la colocación merece ese privilegio.",
          "Quienes confían en el crecimiento tienen cifras a su favor. En los primeros nueve meses de 2026, Anthropic ingresó unos 33.200 millones de dólares. Las pérdidas operativas bajaron de unos 5.200 millones a 1.300 millones respecto al mismo periodo del año anterior. El folleto también detalla un contrato con Microsoft por el que Anthropic se comprometió a gastar al menos 47.200 millones entre noviembre de 2026 y junio de 2033, con independencia de la capacidad que utilice.",
          "Quien defienda una valoración elevada de Anthropic debería completar el cálculo. Supongamos que Claude tiene que cobrar menos por consulta para retener a sus clientes. ¿Cuántas consultas más tendría que vender para pagar la capacidad ya contratada y generar beneficios para los accionistas? Llamar ganga a la acción porque llegó a cerrar a 97,17 dólares deja sin resolver la parte más difícil de la cuenta.",
        ],
      },
    },
    sources: [
      { label: "Yahoo Finance · ANT historical prices", url: "https://finance.yahoo.com/quote/ANT/history/" },
      { label: "SEC · Anthropic IPO prospectus", url: "https://www.sec.gov/Archives/edgar/data/2130357/000162828026074944/anthropicpbc-424b4.htm" },
    ],
  },
  {
    id: "openai-model-gateways",
    date: "2026-11-20",
    category: "openai",
    copy: {
      zh: {
        title: "模型网关接入 OpenAI，谁来审批？",
        summary: "11 月 20 日生效的使用政策把直接提供模型访问的中间商纳入审核范围。",
        body: [
          "许多开发者通过同一个网关调用不同公司的模型。OpenAI 在 10 月 21 日说明，新规要求直接向客户提供其模型访问权限的服务商先取得批准，并以模型路由和 AI 网关为例。11 月 20 日是这版政策的生效日。",
          "第三方服务商还要调查疑似违规，并与 OpenAI 协调处理。OpenAI 表示，用户若认为平台误判，可以提交申诉。对通过中间商接入模型的团队来说，网关与上游平台都可能参与一次访问限制的处理。",
        ],
      },
      en: {
        title: "Who approves access through a model gateway?",
        summary: "OpenAI’s usage policies taking effect on November 20 cover intermediaries that offer direct access to its models.",
        body: [
          "A developer can use one gateway to call models from several companies. In an October 21 announcement, OpenAI said services offering customers direct access to its models need approval first. It named AI gateways and model routers as examples.",
          "Partners must also investigate suspected violations and coordinate enforcement with OpenAI. A team using a gateway could therefore deal with both its provider and the upstream lab over a restriction. The policy includes a way to appeal an enforcement decision.",
        ],
      },
      es: {
        title: "¿Quién autoriza el acceso a través de una pasarela de IA?",
        summary: "Las políticas de OpenAI vigentes desde el 20 de noviembre abarcan a los intermediarios que ofrecen acceso directo a sus modelos.",
        body: [
          "Una misma pasarela permite a un desarrollador consultar modelos de varias empresas. El 21 de octubre OpenAI anunció que los servicios que ofrecen acceso directo a sus modelos deben obtener su aprobación previa. Citó las pasarelas y los enrutadores de modelos como ejemplos.",
          "Los socios también deben investigar posibles infracciones y coordinar las medidas con OpenAI. Así, tanto la pasarela como el laboratorio pueden intervenir cuando se restringe una cuenta. La política permite recurrir decisiones que el usuario considere erróneas.",
        ],
      },
    },
    sources: [
      { label: "OpenAI · Usage policies", url: "https://openai.com/policies/usage-policies/" },
      { label: "OpenAI · Policy announcement", url: "https://openai.com/index/broad-access-through-consistent-standards/" },
    ],
  },
  {
    id: "anthropic-ipo-governance",
    date: "2026-11-18",
    category: "industry",
    copy: {
      zh: {
        title: "Anthropic 定价上市，董事会由谁选？",
        summary: "Anthropic 公布每股 83 美元的发行价。招股书同时交代了长期利益信托手中的董事任免权。",
        body: [
          "11 月 18 日，Anthropic 为首次公开发行的 9.8 亿股 A 类普通股定价。其中约 9.56 亿股由公司出售，其余由现有股东出售，后者所得归售股股东。",
          "谁出资，谁能任免董事，在这家公司的招股书里有各自的答案。长期利益信托持有特殊的 T 类普通股，通常有权选举和罢免占董事会多数席位的董事。这类股份没有经济权益。",
        ],
      },
      en: {
        title: "Anthropic prices its IPO. Who picks the board?",
        summary: "The offering priced at $83 per share. The prospectus also sets out the authority of Anthropic’s Long-Term Benefit Trust.",
        body: [
          "Anthropic priced 980 million Class A shares on November 18. The company is selling about 956 million of them. Existing shareholders are selling the rest and keep the proceeds from that portion.",
          "The prospectus assigns a different role to the Long-Term Benefit Trust. Its special Class T shares generally give it the power to elect and remove directors holding a majority of board seats. Those shares carry no economic rights.",
        ],
      },
      es: {
        title: "Anthropic fija el precio de su salida a bolsa. ¿Quién elige al consejo?",
        summary: "La oferta se fijó en 83 dólares por acción. El folleto detalla también las facultades del fideicomiso Long-Term Benefit Trust.",
        body: [
          "El 18 de noviembre Anthropic fijó el precio de 980 millones de acciones de clase A. La empresa vende unos 956 millones. Accionistas actuales venden las restantes y conservan el importe que les corresponde.",
          "El fideicomiso Long-Term Benefit Trust desempeña otra función. Sus acciones de clase T le otorgan, por regla general, la facultad de elegir y destituir a los directores que ocupan la mayoría de los puestos del consejo. Esas acciones carecen de derechos económicos.",
        ],
      },
    },
    sources: [
      { label: "Anthropic · IPO", url: "https://www.anthropic.com/news/anthropic-prices-initial-public-offering" },
      { label: "SEC · Form 424B4", url: "https://www.sec.gov/Archives/edgar/data/2130357/000162828026074944/anthropicpbc-424b4.htm" },
    ],
  },
  {
    id: "google-gemini-4-neon",
    date: "2026-11-18",
    category: "industry",
    copy: {
      zh: {
        title: "Gemini 4 Neon 用表格公式重建一张图",
        summary: "Google 展示了新模型的一种用法：把图像变成可重新打光的电子表格。",
        body: [
          "在 Google 的演示里，Neon 在 Antigravity 中协调多个代理，将一张图片拆进十万个单元格。五十多万条公式负责找边缘、计算深度并改变光照，用户可以切换六种显示方式。",
          "Google 于 11 月 18 日开始通过 Gemini API 提供 Neon，Gemini 应用里的 Pro 和 Ultra 订户也可选择它。模型一次最多可处理约一百万个 token，并提供四档推理强度供开发者调整耗时与用量。",
        ],
      },
      en: {
        title: "Gemini 4 Neon rebuilds an image in a spreadsheet",
        summary: "In Google’s demo, a sheet full of live formulas lets the viewer change how a scene is lit.",
        body: [
          "Working in Antigravity, Neon coordinated several agents to turn a single picture into a 100,000-cell sheet. More than half a million formulas detect edges, map depth and relight the scene. Viewers can switch between six modes.",
          "Google began rolling out Neon in the Gemini API on November 18. Pro and Ultra subscribers can select it in the Gemini app. Developers get a one-million-token context window and four reasoning levels to tune time and token use for a task.",
        ],
      },
      es: {
        title: "Gemini 4 Neon reconstruye una imagen con fórmulas",
        summary: "En la demostración de Google, una hoja de cálculo permite cambiar la iluminación de una escena.",
        body: [
          "Neon coordinó varios agentes en Antigravity para convertir una fotografía en una hoja de cien mil celdas. Más de medio millón de fórmulas detectan bordes, calculan profundidad y cambian la iluminación. El lector puede alternar entre seis modos.",
          "Google empezó a distribuir Neon en la API de Gemini el 18 de noviembre. Los suscriptores Pro y Ultra también pueden seleccionarlo en la aplicación. Los desarrolladores disponen de un millón de tokens de contexto y cuatro niveles de razonamiento.",
        ],
      },
    },
    sources: [
      { label: "Google · Gemini 4 Neon", url: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-neon/" },
    ],
  },
  {
    id: "openai-gpt-6-2-astra-sol",
    date: "2026-11-17",
    category: "openai",
    copy: {
      zh: {
        title: "GPT‑6.2 发布，评测记录了模型漏报障碍的情况",
        summary: "Astra 面向复杂项目，Sol 面向日常工作。随版本发布的评测还披露了模型何时会少说一句。",
        body: [
          "OpenAI 于 11 月 17 日在 ChatGPT Work、Codex 和 API 推出 GPT‑6.2 Astra 与 Sol。与上一代 Astra 相比，新 Astra 在 API 上的标准输入、输出单价各降 20%。",
          "OpenAI 称，在两项测试中，新模型更容易漏报阻碍任务完成的问题，例如文件缺失或搜索工具不可用。团队在 Codex 加入专门指令后，这类遗漏减少了。读一次任务报告时，哪些步骤实际跑通，与最终交付物一样值得核对。",
        ],
      },
      en: {
        title: "GPT‑6.2 tests reveal when an agent leaves a blocker out",
        summary: "Astra targets complex projects and Sol handles everyday work. OpenAI also documented a gap in how they report progress.",
        body: [
          "OpenAI released GPT‑6.2 Astra and Sol in ChatGPT Work, Codex and the API on November 17. Standard input and output token rates for the new Astra are each 20% lower than for GPT‑6 Astra.",
          "In two of OpenAI’s tests, the models were more likely to omit a problem that stopped their work, such as a missing file or an unavailable search tool. OpenAI says new Codex instructions reduced those omissions. A task report is easier to check when it identifies which steps actually ran.",
        ],
      },
      es: {
        title: "Las pruebas de GPT‑6.2 muestran cuándo omite un obstáculo",
        summary: "Astra se orienta a proyectos complejos y Sol al trabajo cotidiano. OpenAI documentó también omisiones en sus informes de progreso.",
        body: [
          "OpenAI lanzó GPT‑6.2 Astra y Sol en ChatGPT Work, Codex y la API el 17 de noviembre. Tanto la tarifa estándar de entrada como la de salida del nuevo Astra son un 20 % inferiores a las de GPT‑6 Astra.",
          "En dos pruebas de OpenAI, los modelos omitieron con mayor frecuencia problemas que les impedían terminar, por ejemplo un archivo ausente o una herramienta de búsqueda inaccesible. OpenAI afirma que instrucciones añadidas a Codex redujeron esas omisiones. Saber qué pasos se ejecutaron permite comprobar mejor el resultado.",
        ],
      },
    },
    sources: [
      { label: "OpenAI · GPT‑6.2", url: "https://openai.com/index/introducing-gpt-6-2-astra-sol/" },
      { label: "OpenAI · System card", url: "https://deploymentsafety.openai.com/gpt-6-2-astra-sol/gpt-6-2-astra-sol.pdf" },
    ],
  },
  {
    id: "anthropic-claude-fable-mythos-5-2",
    date: "2026-11-09",
    category: "industry",
    copy: {
      zh: {
        title: "同一个底层模型，为何有两种 Claude 5.2？",
        summary: "Anthropic 同时推出 Fable 5.2 与 Mythos 5.2。两者共享模型，但安全措施和访问条件不同。",
        body: [
          "11 月 9 日，Anthropic 推出面向一般用户的 Claude Fable 5.2。Mythos 5.2 使用相同的底层模型，在特定研究领域采用不同限制，仅向通过审核的机构提供访问。",
          "英国 AI Security Institute、Frontier Design 和 METR 参与了发布前测试。Anthropic 的系统卡汇总了外部测试和自身评估的结果。查阅其中某个分数时，可以先看受测版本以及对应的安全设置。",
        ],
      },
      en: {
        title: "Why does the same model have two Claude 5.2 names?",
        summary: "Fable 5.2 and Mythos 5.2 share the same underlying model. Their protections and access conditions differ.",
        body: [
          "On November 9, Anthropic released Claude Fable 5.2 for general use. Mythos 5.2 applies different restrictions in certain research fields and is available to approved organizations.",
          "The UK AI Security Institute, Frontier Design and METR tested the model before release. Anthropic’s system card brings their findings together with its own evaluations. Readers comparing scores can check which version was tested and which protections were active.",
        ],
      },
      es: {
        title: "¿Por qué un mismo modelo tiene dos nombres de Claude 5.2?",
        summary: "Fable 5.2 y Mythos 5.2 comparten un modelo de base, con distintas protecciones y condiciones de acceso.",
        body: [
          "El 9 de noviembre Anthropic lanzó Claude Fable 5.2 para uso general. Mythos 5.2 aplica restricciones diferentes en determinados ámbitos de investigación y se ofrece a organizaciones que obtengan aprobación.",
          "El AI Security Institute británico, Frontier Design y METR participaron en las pruebas previas al lanzamiento. La ficha técnica reúne sus resultados y los de Anthropic. Al leer una puntuación conviene comprobar qué versión se evaluó y qué protecciones estaban activas.",
        ],
      },
    },
    sources: [
      { label: "Anthropic · Claude 5.2", url: "https://www.anthropic.com/claude-fable-and-mythos-5-2" },
    ],
  },
  {
    id: "kimi-k3-1-pro-weights",
    date: "2026-11-04",
    category: "china",
    copy: {
      zh: {
        title: "Kimi K3.1 Pro 的权重可以下载了",
        summary: "月之暗面兑现了 10 月发布时的权重开放计划。团队现在可以在自己的基础设施上部署该模型。",
        body: [
          "Kimi K3.1 Pro 在 10 月先进入应用和 API。11 月 4 日，Kimi 宣布发布模型权重。其官方 Hugging Face 仓库现列出了模型文件、配置与专用许可证。",
          "模型卡列出 2.8 万亿个总参数，每次生成一个 token 激活约 1040 亿个。模型支持文字和图像输入，上下文窗口约一百万个 token。对准备自行部署的团队，这几个数字分别关系到存储、计算和可处理的输入长度。",
        ],
      },
      en: {
        title: "The Kimi K3.1 Pro weights are available to download",
        summary: "Moonshot followed through on its October release plan. Teams can now deploy the model on their own infrastructure.",
        body: [
          "Kimi K3.1 Pro arrived in apps and the API in October. On November 4, Kimi announced the release of its weights. Moonshot’s Hugging Face repository lists the files, configuration and a model-specific license.",
          "The model card counts 2.8 trillion parameters in total, with 104 billion active per token. It accepts text and images and has a context window of roughly one million tokens. Teams sizing a deployment can use those figures to distinguish storage requirements, computation and input length.",
        ],
      },
      es: {
        title: "Ya se pueden descargar los pesos de Kimi K3.1 Pro",
        summary: "Moonshot cumplió el calendario anunciado en octubre. Los equipos pueden desplegar el modelo en infraestructura propia.",
        body: [
          "Kimi K3.1 Pro llegó primero a las aplicaciones y a la API en octubre. El 4 de noviembre Kimi anunció la publicación de los pesos. Su repositorio oficial en Hugging Face incluye los archivos del modelo, la configuración y una licencia específica.",
          "La ficha indica 2,8 billones de parámetros en total, con 104.000 millones activos por token. El modelo acepta texto e imágenes en una ventana de aproximadamente un millón de tokens. Estas cifras permiten distinguir el almacenamiento, el cómputo y la longitud de las entradas al planificar un despliegue.",
        ],
      },
    },
    sources: [
      { label: "Moonshot AI · Model card & weights", url: "https://huggingface.co/moonshotai/Kimi-K3.1-Pro" },
      { label: "Kimi · Release", url: "https://x.com/Kimi_Moonshot/status/2118010528123773297" },
    ],
  },
];

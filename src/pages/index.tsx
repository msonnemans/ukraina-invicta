import Layout from "../components/Layout";
import BasicMeta from "../components/meta/BasicMeta";
import OpenGraphMeta from "../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../components/meta/TwitterCardMeta";
import { SocialList } from "../components/SocialList";
import { GetStaticProps } from "next";
import config from "../lib/config";
import { countPosts, listPostContent, PostContent } from "../lib/posts";
import { listTags, TagContent } from "../lib/tags";

type Props = {
	posts: PostContent[];
};

export default function Index({ posts }: Props) {
  return (
    <Layout>
      <BasicMeta url={"/"} />
      <OpenGraphMeta url={"/"} />
      <TwitterCardMeta url={"/"} />
	  <nav className="top-bar">
        <a href='/'><img src="/images/logo.png"/></a>
        <a href='/'>Home</a>
      </nav>
			<div id="wrapper" className="divided">

					<section className="banner style1 orient-left content-align-left image-position-right fullscreen onload-image-fade-in onload-content-fade-right">
						<div className="content">
							<h1>Ukraina Invicta</h1>
							<p className="major">Supporting those overlooked</p>
							<ul className="actions stacked">
								<li><a href="#donations" className="button big wide smooth-scroll-middle">Help us now</a></li>
							</ul>
						</div>
						<div className="image">
							<img src="images/cherkasy-0b-2.jpg" alt="" />
						</div>
					</section>

					<section className="spotlight style1 orient-right content-align-left image-position-center onscroll-image-fade-in" id="first">
						<div className="content">
							<h2>About us</h2>
							<p>Ukraina Invicta is a foundation that was established at the start of the war on Ukraine in February 2022. Watching the tragedies unfold daily, it was evident that something needed to be done to help support the millions of refugees that would need to escape the devastating reality taking place in their home.</p>
              <p>The primary goal of Ukraina Invicta (UI) is to sponsor families who are in need, in danger and displaced during the war on Ukriane. UI is committed to finding sponsors to adopt families for a period of 3-6 months and aid in re-establishment as they flee the war and leave everything behind. The focus has been to help these families escape by providing transportation, accommodations and food, first and foremost. To provide a safe refuge. </p>
							{/* <ul className="actions stacked">
								<li><a href="#" className="button">Learn More</a></li>
							</ul> */}
						</div>
						<div className="image">
							<img src="images/cherkasy-0b-1.jpg" alt="" />
						</div>
					</section>

					<section className="spotlight style1 orient-left content-align-left image-position-center onscroll-image-fade-in">
						<div className="content">
							<h2>How we began</h2>
							<p>At the start of this tragedy in Ukraine, during incredibly uncertain times, Halya flew to Peremyshl, Poland - her hometown - the border town between Ukraine and Poland. Peremyshl became a safe place for a large portion of Ukrainian refugees; the people of Peremyshl were eager to help Ukrainians fleeing the war from day one with a variety of needs.
</p>
							<p>Halya worked relentlessly to secure transportation, shelter, meals and most importantly a feeling of security and hope for countless families. And this continues to be the top priority for her mission with Ukraina Invicta.
</p>
						</div>
						<div className="image">
							<img src="images/front-3.jpeg" alt="" />
						</div>
					</section>

					<section className="spotlight style1 orient-right content-align-left image-position-center onscroll-image-fade-in">
						<div className="content">
							<h2>What we do</h2>
							<p>A new beginning… interim safety… a warm welcome and support, however the refugee families may need, is the goal. Ukraina Invicta will provide opportunities to ‘adopt a family’ during this difficult transition time as the displaced families work on re-establishment be it in Poland, Europe, USA or Canada.  </p>
							<p>Halya and her team have already helped many families tremendously and are committed to continuing to do so with the generous help of sponsors.
</p>
							{/* <ul className="actions stacked">
								<li><a href="#" className="button">Learn More</a></li>
							</ul> */}
						</div>
						<div className="image">
							<img src="images/1 IF 3.jpg" alt="" />
						</div>
					</section>


					<section className="wrapper style1 align-center">
						<div className="inner">
							<h2>The families we helped</h2>
						
						</div>

							<div className="gallery style2 medium lightbox onscroll-fade-in">
								{posts.map(x => <article key={x.slug}>
									<a href={`/missions/${x.slug}`} className="image">
										<img src={`/images/${x.image}`} alt="" />
									</a>
									<div className="caption">
										<h3>{x.title}</h3>										
										<ul className="actions fixed">
											<li><span className="button small">View</span></li>
										</ul>
									</div>
								</article>)}														
							</div>

					</section>


					<section className="wrapper style1 align-center" id="donations">
						<div className="inner">
							<h2>How you can help</h2>
							
						</div>
					</section>	
					{/* <section className="wrapper style1 align-center" >
						<div className="inner">
							<h2>Financial donations</h2>
							<h3>Money transfer</h3>
							<ul style={{listStyle: 'none'}}>
								<li>Account name: ELISABETTA CAPANNELLI</li>
								<li>IBAN: AT57 2011 1844 2544 4102</li>
								<li>BIC/SWIFT: GIBAATWWXXX</li>
								<li>Reference: <b>UAid Direct</b></li>
							</ul>
							<p>Please let us know when you have transferred money so we can properly thank you.</p>
							<h3>PayPal</h3>
							<a href="https://www.paypal.com/paypalme/TAFUKRA?locale.x=en_AT">TAFUKRA - Team Alberto For UKRAine</a>
							<p>Specify <b>"UAid Direct"</b> with the donation</p>
							<img src="images/paypalb.jpg" style={{maxHeight: 800}}/>
						</div>
					</section>	 */}

					<footer className="wrapper style1 align-center">
						<div className="inner">
							<h2>Contact</h2>
							<p><a href="mailto:ukrainainvicta@gmail.com">ukrainainvicta@gmail.com</a></p>
							<p>Halyna +1 647 781-2021 (Whatsapp & phone)</p>
							<p>Curtin +1 312 792 1782 (WhatsApp) +380 936 099 367 (phone)</p>
						</div>
					</footer>

			</div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
	const posts = listPostContent(1, 1000);
	return {
	  props: {
		posts,
	  },
	};
  };

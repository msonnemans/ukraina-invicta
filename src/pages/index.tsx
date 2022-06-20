import Layout from "../components/Layout";
import BasicMeta from "../components/meta/BasicMeta";
import OpenGraphMeta from "../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../components/meta/TwitterCardMeta";
import { SocialList } from "../components/SocialList";
import { GetStaticProps } from "next";
import config from "../lib/config";
import { countPosts, listPostContent, PostContent } from "../lib/posts";
import { listTags, TagContent } from "../lib/tags";
import { useEffect } from 'react'

type Props = {
	posts: PostContent[];
};

export default function Index({ posts }: Props) {

	useEffect(() => {
		var	$window = $(window),
		$body = $('body'),
		$wrapper = $('#wrapper');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '361px',   '480px'  ],
			xxsmall:  [ null,      '360px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Browser fixes.

		// IE: Flexbox min-height bug.
			if (browser.name == 'ie')
				(function() {

					var flexboxFixTimeoutId;

					$window.on('resize.flexbox-fix', function() {

						var $x = $('.fullscreen');

						clearTimeout(flexboxFixTimeoutId);

						flexboxFixTimeoutId = setTimeout(function() {

							if ($x.prop('scrollHeight') > $window.height())
								$x.css('height', 'auto');
							else
								$x.css('height', '100vh');

						}, 250);

					}).triggerHandler('resize.flexbox-fix');

				})();

		// Object fit workaround.
			if (!browser.canUse('object-fit'))
				(function() {

					$('.banner .image, .spotlight .image').each(function() {

						var $this = $(this),
							$img = $this.children('img'),
							positionClass = $this.parent().attr('class').match(/image-position-([a-z]+)/);

						// Set image.
							$this
								.css('background-image', 'url("' + $img.attr('src') + '")')
								.css('background-repeat', 'no-repeat')
								.css('background-size', 'cover');

						// Set position.
							switch (positionClass.length > 1 ? positionClass[1] : '') {

								case 'left':
									$this.css('background-position', 'left');
									break;

								case 'right':
									$this.css('background-position', 'right');
									break;

								default:
								case 'center':
									$this.css('background-position', 'center');
									break;

							}

						// Hide original.
							$img.css('opacity', '0');

					});

				})();

	// Smooth scroll.
		$('.smooth-scroll').scrolly();
		$('.smooth-scroll-middle').scrolly({ anchor: 'middle' });

	// Wrapper.
		$wrapper.children()
			.scrollex({
				top:		'30vh',
				bottom:		'30vh',
				initialize:	function() {
					$(this).addClass('is-inactive');
				},
				terminate:	function() {
					$(this).removeClass('is-inactive');
				},
				enter:		function() {
					$(this).removeClass('is-inactive');
				},
				leave:		function() {

					var $this = $(this);

					if ($this.hasClass('onscroll-bidirectional'))
						$this.addClass('is-inactive');

				}
			});

			
		$('.items')
			.scrollex({
				top:		'30vh',
				bottom:		'30vh',
				delay:		50,
				initialize:	function() {
					$(this).addClass('is-inactive');
				},
				terminate:	function() {
					$(this).removeClass('is-inactive');
				},
				enter:		function() {
					$(this).removeClass('is-inactive');
				},
				leave:		function() {

					var $this = $(this);

					if ($this.hasClass('onscroll-bidirectional'))
						$this.addClass('is-inactive');

				}
			})
			.children()
				.wrapInner('<div class="inner"></div>');

	// Gallery.
		$('.gallery')
			.wrapInner('<div class="inner"></div>')
			.prepend(browser.mobile ? '' : '<div class="forward"></div><div class="backward"></div>')
			.scrollex({
				top:		'30vh',
				bottom:		'30vh',
				delay:		50,
				initialize:	function() {
					$(this).addClass('is-inactive');
				},
				terminate:	function() {
					$(this).removeClass('is-inactive');
				},
				enter:		function() {
					$(this).removeClass('is-inactive');
				},
				leave:		function() {

					var $this = $(this);

					if ($this.hasClass('onscroll-bidirectional'))
						$this.addClass('is-inactive');

				}
			})
			.children('.inner')
				//.css('overflow', 'hidden')
				.css('overflow-y', browser.mobile ? 'visible' : 'hidden')
				.css('overflow-x', browser.mobile ? 'scroll' : 'hidden')
				.scrollLeft(0);

		// Style #1.
			// ...

		// Style #2.
			$('.gallery')
				.on('wheel', '.inner', function(event) {

					var	$this = $(this),
						delta = (event.originalEvent.deltaX * 10);

					// Cap delta.
						if (delta > 0)
							delta = Math.min(25, delta);
						else if (delta < 0)
							delta = Math.max(-25, delta);

					// Scroll.
						$this.scrollLeft( $this.scrollLeft() + delta );

				})
				.on('mouseenter', '.forward, .backward', function(event) {

					var $this = $(this),
						$inner = $this.siblings('.inner'),
						direction = ($this.hasClass('forward') ? 1 : -1);

					// Clear move interval.
						clearInterval(this._gallery_moveIntervalId);

					// Start interval.
						this._gallery_moveIntervalId = setInterval(function() {
							$inner.scrollLeft( $inner.scrollLeft() + (5 * direction) );
						}, 10);

				})
				.on('mouseleave', '.forward, .backward', function(event) {

					// Clear move interval.
						clearInterval(this._gallery_moveIntervalId);

				});

		// Lightbox.
			$('.gallery.lightbox')
				.on('click', 'a', function(event) {

					var $a = $(this),
						$gallery = $a.parents('.gallery'),
						$modal = $gallery.children('.modal'),
						$modalImg = $modal.find('img'),
						href = $a.attr('href');

					// Not an image? Bail.
						if (!href.match(/\.(jpg|gif|png|mp4)$/))
							return;

					// Prevent default.
						event.preventDefault();
						event.stopPropagation();

					// Locked? Bail.
						if ($modal[0]._locked)
							return;

					// Lock.
						$modal[0]._locked = true;

					// Set src.
						$modalImg.attr('src', href);

					// Set visible.
						$modal.addClass('visible');

					// Focus.
						$modal.focus();

					// Delay.
						setTimeout(function() {

							// Unlock.
								$modal[0]._locked = false;

						}, 600);

				})
				.on('click', '.modal', function(event) {

					var $modal = $(this),
						$modalImg = $modal.find('img');

					// Locked? Bail.
						if ($modal[0]._locked)
							return;

					// Already hidden? Bail.
						if (!$modal.hasClass('visible'))
							return;

					// Lock.
						$modal[0]._locked = true;

					// Clear visible, loaded.
						$modal
							.removeClass('loaded')

					// Delay.
						setTimeout(function() {

							$modal
								.removeClass('visible')

							setTimeout(function() {

								// Clear src.
									$modalImg.attr('src', '');

								// Unlock.
									$modal[0]._locked = false;

								// Focus.
									$body.focus();

							}, 475);

						}, 125);

				})
				.on('keypress', '.modal', function(event) {

					var $modal = $(this);

					// Escape? Hide modal.
						if (event.keyCode == 27)
							$modal.trigger('click');

				})
				.prepend('<div class="modal" tabIndex="-1"><div class="inner"><img src="" /></div></div>')
					.find('img')
						.on('load', function(event) {

							var $modalImg = $(this),
								$modal = $modalImg.parents('.modal');

							setTimeout(function() {

								// No longer visible? Bail.
									if (!$modal.hasClass('visible'))
										return;

								// Set loaded.
									$modal.addClass('loaded');

							}, 275);

						});
	}, [])

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
							<img src="images/ui.png" alt="" />
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
							<img src="images/uiflag.png" alt="" />
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
							<img src="images/uipolice.png" alt="" />
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
							<img src="images/uibreakfast.jpg" alt="" />
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

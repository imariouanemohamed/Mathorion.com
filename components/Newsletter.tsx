"use client";
import { FormEvent, useState } from "react";

export function Newsletter(){
	const [status,setStatus]=useState<"idle"|"submitting"|"success"|"invalid-email"|"error"|"consent-error">("idle");

	async function handleSubmit(event:FormEvent<HTMLFormElement>){
		event.preventDefault();
		const form=event.currentTarget;
		const emailField=form.elements.namedItem("EMAIL");
		const consentField=form.elements.namedItem("OPT_IN");
		const honeypotField=form.elements.namedItem("email_address_check");
		if(!(emailField instanceof HTMLInputElement)||!(consentField instanceof HTMLInputElement)||!(honeypotField instanceof HTMLInputElement)){
			setStatus("error");
			return;
		}
		const email=emailField.value.trim();
		emailField.value=email;
		const emailIsValid=email.length>0&&emailField.checkValidity();
		const consent=consentField.checked;
		if(!emailIsValid){
			setStatus("invalid-email");
			return;
		}
		if(!consent){
			setStatus("consent-error");
			return;
		}

		setStatus("submitting");
		try{
			const response=await fetch("/api/newsletter",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email,consent,honeypot:honeypotField.value})});
			if(!response.ok) throw new Error("Brevo subscription failed");
			setStatus("success");
			form.reset();
		}catch{
			setStatus("error");
		}
	}

	const statusMessage=status==="success"?"Almost there! Check your inbox and confirm your subscription.":status==="invalid-email"?"Please enter a valid email address.":status==="consent-error"?"Please agree to receive the Mathorion newsletter.":status==="error"?"We couldn't process your subscription right now. Please try again later.":null;

	return <section className="newsletter shell"><div><p className="eyebrow"><span/>Newsletter</p><h2>Get the Mathorion<br/><em>Challenge</em></h2></div><div><p>Receive new mathematical challenges, visual explanations, and the latest Mathorion videos.</p><form method="POST" action="/api/newsletter" data-type="subscription" noValidate onSubmit={handleSubmit}><div className="newsletter-form-row"><label className="sr-only" htmlFor="newsletter-email">Email address</label><input id="newsletter-email" name="EMAIL" type="email" placeholder="you@example.com" required/><button className="button" type="submit" disabled={status==="submitting"}>{status==="submitting"?"Subscribing...":<>Subscribe <span>→</span></>}</button></div><label className="newsletter-consent"><input name="OPT_IN" type="checkbox" value="1" required/> <span>I agree to receive the Mathorion newsletter by email.</span></label><input type="text" name="email_address_check" value="" className="newsletter-honeypot" readOnly tabIndex={-1} autoComplete="off" aria-hidden="true"/><input type="hidden" name="locale" value="fr"/></form>{statusMessage&&<small role="status">{statusMessage}</small>}</div></section>
}
